import React from 'react';
import { Link } from 'react-router-dom';

const Cancel = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-100">
      <div className="text-center p-6 bg-white rounded shadow-lg">
        <h1 className="text-3xl font-bold text-red-600 mb-4"> Payment Cancelled!</h1>
        <p className="text-gray-700 mb-6">Your payment was not completed.</p>
        <Link
          to="/cart"
          className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Back to Cart
        </Link>
      </div>
    </div>
  );
};

export default Cancel;
