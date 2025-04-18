import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBox, FaTruck, FaUsers, FaDollarSign, FaShoppingBag, FaListAlt } from 'react-icons/fa';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    orders: 0,
    revenue: 0,
    products: 0,
    customers: 0
  });
  
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call to fetch dashboard data
    const fetchDashboardData = async () => {
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        setStats({
          orders: 156,
          revenue: 25890.50,
          products: 48,
          customers: 273
        });
        
        setRecentOrders([
          {
            id: 'ORD-1001',
            customer: 'John Smith',
            date: '2023-06-12',
            amount: 679.98,
            status: 'Delivered',
            products: ['Premium Ceiling Fan', 'Tower Fan']
          },
          {
            id: 'ORD-1002',
            customer: 'Emily Johnson',
            date: '2023-06-11',
            amount: 549.99,
            status: 'Shipped',
            products: ['Inverter Split AC']
          },
          {
            id: 'ORD-1003',
            customer: 'Michael Brown',
            date: '2023-06-10',
            amount: 129.99,
            status: 'Paid',
            products: ['Premium Ceiling Fan']
          },
          {
            id: 'ORD-1004',
            customer: 'Sarah Wilson',
            date: '2023-06-09',
            amount: 479.97,
            status: 'Delivered',
            products: ['Table Fan', 'Window AC']
          },
          {
            id: 'ORD-1005',
            customer: 'David Lee',
            date: '2023-06-08',
            amount: 1099.98,
            status: 'Shipped',
            products: ['Inverter Split AC', 'Smart Window AC']
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
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div className="flex gap-4">
          <Link to="/admin/orders" className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition">
            Manage Orders
          </Link>
          <Link to="/admin/riders" className="bg-secondary text-white px-4 py-2 rounded-md hover:bg-secondary-dark transition">
            Manage Riders
          </Link>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mr-4">
              <FaShoppingBag className="text-primary text-xl" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Orders</p>
              <h2 className="text-2xl font-bold">{stats.orders}</h2>
            </div>
          </div>
          <div className="text-xs text-green-600 flex items-center">
            <span className="font-medium">+12%</span>
            <span className="ml-1">from last month</span>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-green-500 bg-opacity-10 rounded-full flex items-center justify-center mr-4">
              <FaDollarSign className="text-green-500 text-xl" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Revenue</p>
              <h2 className="text-2xl font-bold">${stats.revenue.toLocaleString()}</h2>
            </div>
          </div>
          <div className="text-xs text-green-600 flex items-center">
            <span className="font-medium">+8%</span>
            <span className="ml-1">from last month</span>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-blue-500 bg-opacity-10 rounded-full flex items-center justify-center mr-4">
              <FaBox className="text-blue-500 text-xl" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Products</p>
              <h2 className="text-2xl font-bold">{stats.products}</h2>
            </div>
          </div>
          <div className="text-xs text-green-600 flex items-center">
            <span className="font-medium">+5%</span>
            <span className="ml-1">from last month</span>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-purple-500 bg-opacity-10 rounded-full flex items-center justify-center mr-4">
              <FaUsers className="text-purple-500 text-xl" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Customers</p>
              <h2 className="text-2xl font-bold">{stats.customers}</h2>
            </div>
          </div>
          <div className="text-xs text-green-600 flex items-center">
            <span className="font-medium">+15%</span>
            <span className="ml-1">from last month</span>
          </div>
        </div>
      </div>
      
      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-md mb-8">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Recent Orders</h2>
            <Link to="/admin/orders" className="text-primary hover:text-primary-dark flex items-center">
              View All <FaListAlt className="ml-1" />
            </Link>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Products</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.customer}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div className="max-w-xs truncate">{order.products.join(', ')}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${order.amount.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      order.status === 'Delivered' 
                        ? 'bg-green-100 text-green-800' 
                        : order.status === 'Shipped' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 