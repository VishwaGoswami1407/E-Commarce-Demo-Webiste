const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
// const stripe = {}
const jwt = require("jsonwebtoken");
const { Cart } = require("../model/Cart");
const { User } = require("../model/User");
const { Product } = require("../model/Product");
const sendEmail = require("../utils/userEmail");

const cart = async (req, res) => {
  const { token } = req.headers;
  const decodedtoken = jwt.verify(token, "supersecret");
  const user = await User.findOne({ email: decodedtoken.email }).populate({
    path: "cart",
    populate: {
      path: "products.product",
      model: "Product",
    },
  });
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  res.status(200).json({ cart: user.cart });
};

const addCart = async (req, res) => {
  try {
    console.log(req.body);
    const { quantity, productId } = req.body.products[0];

    // 1. Validate input
    if (!quantity || !productId) {
      return res.status(400).json({ message: "Some fields are missing" });
    }

    // 2. Decode JWT token and find the user
    const { token } = req.headers;
    const decodedToken = jwt.verify(token, "supersecret");
    const user = await User.findOne({ email: decodedToken.email });

    if (!user) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    // 3. Find product and check stock
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.stock < quantity) {
      return res
        .status(400)
        .json({ message: "Out of Stock or insufficient quantity" });
    }

    let cart;

    // 4. Check if user already has a cart
    if (user.cart) {
      cart = await Cart.findById(user.cart);

      // If cart doesn't exist in DB, create new one
      if (!cart) {
        cart = await Cart.create({
          products: [{ product: productId, quantity }],
          total: product.price * quantity,
        });

        user.cart = cart._id;
        await user.save();
      } else {
        // Check if product is already in cart
        const exists = cart.products.some(
          (p) => p.product.toString() === productId.toString()
        );

        if (exists) {
          return res.status(409).json({ message: "Go to Cart" });
        }

        // Add new product to existing cart
        cart.products.push({ product: productId, quantity });
        cart.total += product.price * quantity;
        await cart.save();
      }
    } else {
      // 5. Create new cart if user has no cart
      cart = await Cart.create({
        products: [{ product: productId, quantity }],
        total: product.price * quantity,
      });

      user.cart = cart._id;
      await user.save();
    }

    // 6. Reduce product stock
    product.stock -= quantity;
    await product.save();

    res.status(200).json({ message: "Product added to cart" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateCart = async (req, res) => {
  try {
    const { productId, action } = req.body;
    const { token } = req.headers;

    // 1. Decode token and get user with populated cart
    const decodedToken = jwt.verify(token, "supersecret");
    const user = await User.findOne({ email: decodedToken.email }).populate({
      path: "cart",
      populate: {
        path: "products.product",
        model: "Product",
      },
    });

    // 2. Check if user or cart exists
    if (!user || !user.cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const cart = user.cart;

    // 3. Find the specific product in cart
    const item = cart.products.find(
      (p) => p.product._id.toString() === productId
    );

    if (!item) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    // 4. Get product from DB and price
    const product = await Product.findById(productId);
    const price = product.price;

    // 5. Perform the action: increase, decrease, or remove
    if (action === "increase") {
      if (product.stock < 1) {
        return res.status(400).json({ message: "Out of stock" });
      }

      item.quantity += 1;
      cart.total += price;
      product.stock -= 1;
    } else if (action === "decrease") {
      if (item.quantity > 1) {
        item.quantity -= 1;
        cart.total -= price;
        product.stock += 1;
      } else {
        // If quantity is 1, remove the product from cart
        cart.total -= price;
        cart.products = cart.products.filter(
          (p) => p.product._id.toString() !== productId
        );
        product.stock += 1;
      }
    } else if (action === "remove") {
      // Remove the entire product from cart and restore stock
      cart.total -= price * item.quantity;
      cart.products = cart.products.filter(
        (p) => p.product._id.toString() !== productId
      );
      product.stock += item.quantity;
    } else {
      return res.status(400).json({ message: "Invalid action" });
    }

    // 6. Save updated cart and product
    await cart.save();
    await product.save();

    res.status(200).json({
      message: "Cart updated",
      cart,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const payment = async (req, res) => {
  try {
    const { token } = req.headers;
    const decodedToken = jwt.verify(token, "supersecret");
    const user = await User.findOne({ email: decodedToken.email }).populate({
      path: "cart",
      populate: {
        path: "products.product",
        model: "Product",
      },
    });
    if (!user || !user.cart || user.cart.products.length === 0) {
      res.status(404).json({ message: "user or cart not found" });
    }

    //payment
    const lineItems = user.cart.products.map((item) => {
      return {
        price_data: {
          currency: "inr",
          product_data: {
            name: item.product.name,
          },
          unit_amount: item.product.price * 100,
        },
        quantity: item.quantity,
      };
    });

    const curentUrl = process.env.CLIENT_URL;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${curentUrl}/success`,
      cancel_url: `${curentUrl}/cancel`,
    });

    //send email to user
    await sendEmail(
      user.email,

      user.cart.products.map((item) => ({
        name: item.product.name,
        price: item.product.price,
      }))
    );

    //empty cart
    user.cart.products = [];
    user.cart.total = 0;
    await user.cart.save();
    await user.save();
    res.status(200).json({
      message: "get the payment url",
      url: session.url,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ----- NEW: directly set a product quantity in the cart -----
const updateQuantity = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const { token } = req.headers;

    if (!productId || typeof quantity !== "number") {
      return res
        .status(400)
        .json({ message: "productId and quantity are required" });
    }

    if (quantity < 0) {
      return res.status(400).json({ message: "Quantity must be >= 0" });
    }

    // Find user and populate cart
    const decodedToken = jwt.verify(token, "supersecret");
    const user = await User.findOne({ email: decodedToken.email }).populate({
      path: "cart",
      populate: { path: "products.product", model: "Product" },
    });

    if (!user || !user.cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const cart = user.cart;
    const item = cart.products.find(
      (p) => p.product._id.toString() === productId
    );

    if (!item) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    // Retrieve product to update stock
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const oldQty = item.quantity;
    const diff = quantity - oldQty; // positive if increasing, negative if decreasing

    if (diff > 0 && product.stock < diff) {
      return res.status(400).json({ message: "Not enough stock" });
    }

    // Adjust stock
    product.stock -= diff; // negative diff will add stock back

    // Update item quantity & cart total
    item.quantity = quantity;
    cart.total = cart.total + diff * product.price;

    // If quantity becomes 0, remove item
    if (item.quantity === 0) {
      cart.products = cart.products.filter(
        (p) => p.product._id.toString() !== productId
      );
    }

    await product.save();
    await cart.save();

    res.status(200).json({ message: "Quantity updated", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { cart, addCart, updateCart, updateQuantity, payment };
