import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaTrash, FaMinus, FaPlus } from 'react-icons/fa';
import { useCart } from '../contexts/CartContext';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, getCartTotal, isCartEmpty } = useCart();
  
  // Calculate cart total
  const cartTotal = getCartTotal();
  
  if (isCartEmpty()) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="text-gray-500 mb-4">
              <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
              <p className="text-xl">Your cart is empty</p>
            </div>
            <Link to="/products" className="inline-block bg-primary hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition">
              <FaArrowLeft className="inline mr-2" /> Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-grow">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map(item => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <img src={item.image} alt={item.name} className="h-16 w-16 object-cover rounded" />
                          <div className="ml-4">
                            <Link to={`/product/${item.id}`} className="font-medium text-gray-900 hover:text-primary">{item.name}</Link>
                            <p className="text-sm text-gray-500">{item.category}</p>
                            {(item.color || item.size) && (
                              <p className="text-sm text-gray-500">
                                {item.color && `Color: ${item.color}`}
                                {item.color && item.size && ' | '}
                                {item.size && `Size: ${item.size}`}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 font-medium">${item.price.toFixed(2)}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center border rounded-md w-28">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-3 py-1 text-gray-600 hover:text-primary"
                          >
                            <FaMinus size={12} />
                          </button>
                          <span className="w-10 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-3 py-1 text-gray-600 hover:text-primary"
                          >
                            <FaPlus size={12} />
                          </button>
                        </div>
                      </td>
                      <td className="py-4 px-4 font-medium">${(item.price * item.quantity).toFixed(2)}</td>
                      <td className="py-4 px-4">
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 border-t border-gray-200">
                <button 
                  onClick={clearCart}
                  className="text-sm text-red-600 hover:text-red-800"
                >
                  Clear Cart
                </button>
              </div>
            </div>
            
            <div className="mt-4">
              <Link to="/products" className="inline-flex items-center text-primary hover:text-blue-700">
                <FaArrowLeft className="mr-2" /> Continue Shopping
              </Link>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">Free</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-xl text-primary">${cartTotal.toFixed(2)}</span>
                </div>
              </div>
              
              <Link 
                to="/checkout" 
                className="block w-full bg-primary hover:bg-blue-700 text-white text-center py-3 rounded-md font-medium transition"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart; 