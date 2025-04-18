import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBox, FaCheckCircle, FaTimesCircle, FaRoute, FaUser, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const RiderDashboard = () => {
  const [stats, setStats] = useState({
    assigned: 0,
    delivered: 0,
    undelivered: 0,
    total: 0
  });
  
  const [activeOrders, setActiveOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [undeliveredReason, setUndeliveredReason] = useState('');
  const [processingOrderId, setProcessingOrderId] = useState(null);
  
  useEffect(() => {
    // Simulate API call to fetch rider dashboard data
    const fetchDashboardData = async () => {
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        setStats({
          assigned: 3,
          delivered: 12,
          undelivered: 1,
          total: 16
        });
        
        setActiveOrders([
          {
            id: 'ORD-1002',
            customer: 'Emily Johnson',
            address: '456 Oak Ave, Somewhere, NY 67890',
            contact: '(555) 987-6543',
            email: 'emily.j@example.com',
            date: '2023-06-11',
            status: 'Shipped',
            items: [
              { name: 'Inverter Split AC', price: 549.99, quantity: 1, color: 'White', size: '1.5 Ton' }
            ]
          },
          {
            id: 'ORD-1005',
            customer: 'David Lee',
            address: '246 Maple Dr, Anywhere, WA 97531',
            contact: '(555) 234-5678',
            email: 'david.lee@example.com',
            date: '2023-06-08',
            status: 'Shipped',
            items: [
              { name: 'Inverter Split AC', price: 549.99, quantity: 2, color: 'White', size: '2 Ton' }
            ]
          },
          {
            id: 'ORD-1009',
            customer: 'Amanda Wilson',
            address: '789 Birch Blvd, Sometown, CA 12345',
            contact: '(555) 876-5432',
            email: 'amanda.w@example.com',
            date: '2023-06-13',
            status: 'Shipped',
            items: [
              { name: 'Premium Ceiling Fan', price: 129.99, quantity: 1, color: 'White', size: 'Medium' },
              { name: 'Table Fan', price: 49.99, quantity: 1, color: 'Blue', size: 'Small' }
            ]
          }
        ]);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);
  
  const updateOrderStatus = (orderId, newStatus, note = '') => {
    // In a real app, this would update the order status via API
    // For this demo, we'll update it locally
    const updatedOrders = activeOrders.filter(order => order.id !== orderId);
    
    setActiveOrders(updatedOrders);
    
    // Update stats
    if (newStatus === 'Delivered') {
      setStats({
        ...stats,
        assigned: stats.assigned - 1,
        delivered: stats.delivered + 1
      });
    } else if (newStatus === 'Undelivered') {
      setStats({
        ...stats,
        assigned: stats.assigned - 1,
        undelivered: stats.undelivered + 1
      });
    }
    
    // Reset undelivered input state
    setProcessingOrderId(null);
    setUndeliveredReason('');
  };
  
  const handleUndeliveredSubmit = (orderId) => {
    if (undeliveredReason.trim()) {
      updateOrderStatus(orderId, 'Undelivered', undeliveredReason);
    } else {
      alert('Please provide a reason for not delivering the order');
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Rider Dashboard</h1>
        <Link to="/rider/orders" className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition">
          View All Orders
        </Link>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mr-4">
              <FaBox className="text-primary text-xl" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Assigned Orders</p>
              <h2 className="text-2xl font-bold">{stats.assigned}</h2>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-green-500 bg-opacity-10 rounded-full flex items-center justify-center mr-4">
              <FaCheckCircle className="text-green-500 text-xl" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Delivered</p>
              <h2 className="text-2xl font-bold">{stats.delivered}</h2>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-red-500 bg-opacity-10 rounded-full flex items-center justify-center mr-4">
              <FaTimesCircle className="text-red-500 text-xl" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Undelivered</p>
              <h2 className="text-2xl font-bold">{stats.undelivered}</h2>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-blue-500 bg-opacity-10 rounded-full flex items-center justify-center mr-4">
              <FaRoute className="text-blue-500 text-xl" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Deliveries</p>
              <h2 className="text-2xl font-bold">{stats.total}</h2>
            </div>
          </div>
        </div>
      </div>
      
      {/* Active Orders */}
      <div className="bg-white rounded-lg shadow-md mb-8">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Active Orders</h2>
            <Link to="/rider/orders" className="text-primary hover:text-primary-dark">View All Orders</Link>
          </div>
        </div>
        
        {activeOrders.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500">No active orders assigned to you at the moment.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {activeOrders.map((order) => (
              <div key={order.id} className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-medium text-lg mb-1">Order #{order.id}</h3>
                    <p className="text-sm text-gray-500 mb-1">Order Date: {order.date}</p>
                    <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {order.status}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-lg">
                      ${order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-500">
                      {order.items.reduce((sum, item) => sum + item.quantity, 0)} item(s)
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <h4 className="font-medium text-sm text-gray-500 mb-2">Customer Information</h4>
                    <div className="space-y-2">
                      <p className="text-sm flex items-center">
                        <FaUser className="mr-2 text-gray-400" /> {order.customer}
                      </p>
                      <p className="text-sm flex items-center">
                        <FaPhone className="mr-2 text-gray-400" /> {order.contact}
                      </p>
                      <p className="text-sm flex items-center">
                        <FaMapMarkerAlt className="mr-2 text-gray-400" /> {order.address}
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm text-gray-500 mb-2">Order Items</h4>
                    <ul className="space-y-2">
                      {order.items.map((item, index) => (
                        <li key={index} className="text-sm border-b border-gray-100 pb-1">
                          <span className="font-medium">{item.name}</span> x {item.quantity}
                          <div className="text-xs text-gray-500">
                            {item.color && item.size ? `${item.color}, ${item.size}` : ''}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {processingOrderId === order.id ? (
                  <div className="bg-gray-50 p-4 rounded-md mb-4">
                    <label htmlFor={`undeliveredReason-${order.id}`} className="block text-sm font-medium text-gray-700 mb-2">
                      Please provide a reason for not delivering:
                    </label>
                    <textarea
                      id={`undeliveredReason-${order.id}`}
                      rows="3"
                      className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-primary focus:border-primary"
                      value={undeliveredReason}
                      onChange={(e) => setUndeliveredReason(e.target.value)}
                      placeholder="Enter the reason why the order couldn't be delivered..."
                    ></textarea>
                    <div className="mt-3 flex justify-end space-x-3">
                      <button
                        onClick={() => setProcessingOrderId(null)}
                        className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleUndeliveredSubmit(order.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded-md text-sm hover:bg-red-600"
                        disabled={!undeliveredReason.trim()}
                      >
                        Confirm Undelivered
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => updateOrderStatus(order.id, 'Delivered')}
                      className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition flex items-center"
                    >
                      <FaCheckCircle className="mr-2" /> Mark as Delivered
                    </button>
                    <button
                      onClick={() => setProcessingOrderId(order.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition flex items-center"
                    >
                      <FaTimesCircle className="mr-2" /> Mark as Undelivered
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RiderDashboard; 