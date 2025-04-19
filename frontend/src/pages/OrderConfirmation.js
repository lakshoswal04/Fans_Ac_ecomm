import React from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle, FaHome, FaShoppingBag } from 'react-icons/fa';

const OrderConfirmation = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8 text-center">
        <div className="text-5xl text-green-500 mb-6 flex justify-center">
          <FaCheckCircle />
        </div>
        <h2 className="text-3xl font-bold mb-4">Order Placed Successfully!</h2>
        <p className="text-gray-600 mb-8">
          Thank you for your order. We've received your purchase request and will process it shortly.
          You will receive an email confirmation with your order details.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/" className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-dark transition flex items-center">
            <FaHome className="mr-2" /> Return to Home
          </Link>
          <Link to="/products" className="bg-secondary text-white px-6 py-3 rounded-md hover:bg-secondary-dark transition flex items-center">
            <FaShoppingBag className="mr-2" /> Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation; 