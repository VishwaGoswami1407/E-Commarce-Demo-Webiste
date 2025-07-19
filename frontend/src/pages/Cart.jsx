import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Trash2, Plus, Minus } from 'lucide-react';
import { getCart, removeFromCart, updateQuantity,makePayment } from '../api/cart'; // makePayment removed for now

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [isPaying, setIsPaying] = useState(false);

  async function getCartsData() {
    return await getCart();
  }

  useEffect(() => {
    async function fetchCartData() {
      const currentCart = await getCartsData();
      const currentProducts = currentCart?.cart?.products || [];
      setCart(currentProducts);
      setCartTotal(
        currentProducts.reduce(
          (total, item) => total + (item.product?.price || 0) * (item.quantity || 1),
          0
        )
      );
    }

    fetchCartData();
  }, []);

  const handleRemoveItem = async (itemId) => {
    await removeFromCart(itemId);
    const updatedCart = await getCart();
    const updatedProducts = updatedCart?.cart?.products || [];
    setCart(updatedProducts);
    setCartTotal(
      updatedProducts.reduce(
        (total, item) => total + (item.product?.price || 0) * (item.quantity || 1),
        0
      )
    );
  };

  const handleIncreaseQuantity = async (itemId, currentQty) => {
    const newQty = (currentQty || 1) + 1;
    await updateQuantity(itemId, newQty);
    const updatedCart = await getCart();
    const updatedProducts = updatedCart?.cart?.products || [];
    setCart(updatedProducts);
    setCartTotal(
      updatedProducts.reduce(
        (total, item) => total + (item.product?.price || 0) * (item.quantity || 1),
        0
      )
    );
  };

  const handleDecreaseQuantity = async (itemId, currentQty) => {
    if ((currentQty || 1) <= 1) {
      await handleRemoveItem(itemId);
      return;
    }
    await updateQuantity(itemId, (currentQty || 1) - 1);
    const updatedCart = await getCart();
    const updatedProducts = updatedCart?.cart?.products || [];
    setCart(updatedProducts);
    setCartTotal(
      updatedProducts.reduce(
        (total, item) => total + (item.product?.price || 0) * (item.quantity || 1),
        0
      )
    );
  };

 const handleCheckout = async () => {
  try {
    setIsPaying(true);
    const res = await makePayment();
    if (res?.url) {
      window.location.href = res.url; // Redirect to Stripe
    } else {
      alert("Stripe did not return a valid URL");
    }
  } catch (err) {
    console.error("Payment Error:", err.message);
    alert("Payment failed. Check console for more details.");
  } finally {
    setIsPaying(false);
  }
};


  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center py-16">
            <ShoppingBag className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Looks like you haven't added any items yet.</p>
            <Link
              to="/products"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Shopping Cart</h1>

        {/* 💡 Note about payment
        <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 px-4 py-3 rounded mb-6">
          💡 <span className="font-semibold">Note:</span> Payment gateway integration is in progress. All other features are functional.
        </div> */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <ul className="divide-y divide-gray-200">
                {cart.map((item) => (
                  <li key={item._id} className="p-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.product?.image || "/placeholder.svg"}
                        alt={item.product?.name || "Product Image"}
                        className="h-20 w-20 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-gray-900">{item.product?.name}</h3>
                        <p className="text-lg font-medium text-gray-900">
                          ${(item.product?.price * (item.quantity || 1)).toFixed(2)}
                        </p>
                        <div className="flex items-center space-x-2 mt-2">
                          <button
                            onClick={() => handleDecreaseQuantity(item.product?._id || item._id, item.quantity)}
                            className="p-1 bg-gray-200 rounded hover:bg-gray-300"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="min-w-[24px] text-center">{item.quantity || 1}</span>
                          <button
                            onClick={() => handleIncreaseQuantity(item.product?._id || item._id, item.quantity)}
                            className="p-1 bg-gray-200 rounded hover:bg-gray-300"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveItem(item.product?._id || item._id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-900">Free</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-medium text-gray-900">Total</span>
                    <span className="text-lg font-medium text-gray-900">${cartTotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* 🔕 Disabled Payment Button */}
                <button
                onClick={handleCheckout}
                className={`w-full py-2 px-4 rounded mt-6 text-white font-semibold transition 
                    ${isPaying ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"}`}
                disabled={isPaying}
                >
                {isPaying ? "Processing..." : "Make Payment"}
                </button>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
