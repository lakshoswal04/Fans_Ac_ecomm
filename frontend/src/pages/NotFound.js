import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaShoppingBag } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="max-w-lg w-full text-center">
        <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-900 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page you are looking for might have been removed, had its name changed, 
          or is temporarily unavailable.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/" className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-dark transition flex items-center">
            <FaHome className="mr-2" /> Go Home
          </Link>
          <Link to="/products" className="bg-white text-primary border border-primary px-6 py-3 rounded-md hover:bg-gray-50 transition flex items-center">
            <FaShoppingBag className="mr-2" /> Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound; 