const API_URL = "http://localhost:8080";

// Accepts a productID and an optional quantity (defaults to 1) and sends both
// pieces of data to the backend so it can either add a new item or increment an
// existing one.
export async function addToCart(productID, quantity = 1) {
  const response = await fetch(`${API_URL}/cart/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: JSON.parse(localStorage.getItem("user")).token,
    },
    // The backend expects an array of product objects containing id & quantity
    body: JSON.stringify({
      products: [{ productId: productID, quantity }],
    }),
  });

  if (!response.ok) {
    throw new Error("Adding Product to Cart Failed");
  }

  return await response.json();
}

export async function getCart() {
  const response = await fetch(`${API_URL}/cart/userCart`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: JSON.parse(localStorage.getItem("user")).token,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return await response.json();
}

export async function updateQuantity(productID, quantity) {
  const response = await fetch(`${API_URL}/cart/update/quantity`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      token: JSON.parse(localStorage.getItem("user")).token,
    },
    body: JSON.stringify({ productId: productID, quantity }),
  });

  if (!response.ok) {
    throw new Error("Updating Cart Quantity Failed");
  }

  return await response.json();
}

export async function removeFromCart(productID) {
  // Backend expects update with action "remove"; use PUT
  const response = await fetch(`${API_URL}/cart/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      token: JSON.parse(localStorage.getItem("user")).token,
    },
    body: JSON.stringify({ productId: productID, action: "remove" }),
  });

  if (!response.ok) {
    throw new Error("Deleting Product From Cart Failed");
  }

  return await response.json();
}

export async function makePayment() {
  const response = await fetch(`${API_URL}/cart/payment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: JSON.parse(localStorage.getItem("user")).token,
    },
  });

  const responseText = await response.text();
  console.log(responseText);

  if (!response.ok) {
    console.error("Raw Backend Error:", responseText);
    throw new Error("Failed to initiate payment");
  }

  return JSON.parse(responseText);
}