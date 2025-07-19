import React from 'react';
import { Link } from 'react-router-dom';

const Success = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">
      <div className="text-center p-6 bg-white rounded shadow-lg">
        <h1 className="text-3xl font-bold text-green-600 mb-4">🎉 Payment Successful!</h1>
        <p className="text-gray-700 mb-6">Thank you for your purchase.</p>
        <Link
          to="/"
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default Success;
