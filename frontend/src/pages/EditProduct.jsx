import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSingleProduct, updateProduct  } from '../api/product';

export default function EditProduct() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    stock: 0,
    brand: ''
  });

  // 🔸 Fetch product on load
 // 👇 Function outside useEffect
async function fetchProductData(id, setProduct) {
  try {
    const productData = await getSingleProduct(id);
    setProduct(productData);
  } catch (error) {
    console.error("Failed to fetch product:", error);
  }
}

// Inside component:
useEffect(() => {
  if (id) {
    fetchProductData(id, setProduct); // 👈 Call the external function
  }
}, [id]);

  // 🔸 Handle form submit
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      await updateProduct(id, product);
      navigate('/products');
    } catch (error) {
      console.error('Failed to update product:', error);
    } finally {
      setLoading(false);
    }
  }

  // 🔸 Input change handler
  function handleInputChange(e) {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: value
    }));
  }

 return (
  <div className="min-h-screen bg-gray-50 py-8">
    <div className="max-w-2xl mx-auto px-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Product</h1>

      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 🔸 Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={product.name}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          {/* 🔸 Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              value={product.description}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          {/* 🔸 Price */}
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="text"
              name="price"
              id="price"
              value={product.price}
              onChange={handleInputChange}
              required
              className="block w-full rounded-md border-gray-300 mt-1 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          {/* 🔸 Image URL */}
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
              Image URL
            </label>
            <input
              type="url"
              id="image"
              name="image"
              value={product.image}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          {/* 🔸 Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/products')}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? 'Updating...' : 'Update Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
);

}
