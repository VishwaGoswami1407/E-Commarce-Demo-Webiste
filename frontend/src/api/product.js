const API_URL = "http://localhost:8080";

export async function getAllProducts() {
  const res = await fetch(`${API_URL}/products`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      token: JSON.parse(localStorage.getItem("user")).token,
    },
  });

  const data = await res.json();
  return data;
}

export async function AddProduct(product) {
  const res = await fetch(`${API_URL}/add-products`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      token: JSON.parse(localStorage.getItem("user")).token,
    },
    body: JSON.stringify(product),
  });

  const data = await res.json();
  return data;
}

export async function getSingleProduct(id) {
  const res = await fetch(`${API_URL}/products/${id}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      token: JSON.parse(localStorage.getItem("user")).token,
    },
  });

  const data = await res.json();
  return data.product;
}

export async function updateProduct(id, productData) {
  const res = await fetch(`${API_URL}/edit/${id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
      token: JSON.parse(localStorage.getItem("user")).token,
    },
    body: JSON.stringify(productData),
  });

  const data = await res.json();
  return data.product;
}

export async function deleteProduct(productId) {
  const res = await fetch(`${API_URL}/delete/${productId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      token: JSON.parse(localStorage.getItem("user")).token,
    },
  });

  return res.json();
}
