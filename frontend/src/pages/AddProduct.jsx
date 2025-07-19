import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addProduct } from '../api/product'; // Make sure you're importing from the correct file

export default function AddProduct() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    // 🔸 Get form data
    const form = e.target;
    const name = form.name.value;
    const description = form.description.value;
    const price = parseFloat(form.price.value);
    const image = form.image.value;
    const stock = 200;

    try {
      setLoading(true);

      // 🔸 API Call
      await addProduct({ name, description, price, image, stock });

      // 🔸 Redirect after success
      navigate('/products');
    } catch (error) {
      console.error('Failed to create product:', error);
      alert('Failed to create product');
    } finally {
      setLoading(false);
    }
  }

  return(
    <div className="min-h-screen bg-gradient-to-r from-gray-50 to-indigo-50 py-10 px-4 sm:px-6 lg:px-8">
  <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md">
    <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">Add New Product</h1>

    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 🔸 Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Product Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter product name"
          required
          className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      {/* 🔸 Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          placeholder="Write a short description..."
          required
          className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      {/* 🔸 Price */}
      <div>
        <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
          Price (in ₹)
        </label>
        <input
          type="number"
          name="price"
          id="price"
          placeholder="199.00"
          required
          step="0.01"
          min="0"
          className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      {/* 🔸 Image URL */}
      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
          Image URL
        </label>
        <input
          type="url"
          id="image"
          name="image"
          placeholder="https://example.com/image.jpg"
          required
          className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      {/* 🔸 Buttons */}
      <div className="flex justify-end space-x-4 pt-4">
        <button
          type="button"
          onClick={() => navigate('/products')}
          className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-md hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md disabled:opacity-50"
        >
          {loading ? 'Creating...' : 'Create Product'}
        </button>
      </div>
    </form>
  </div>
</div>

  )
   
}