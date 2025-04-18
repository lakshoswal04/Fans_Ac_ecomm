import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaArrowLeft, FaEye, FaTruck } from 'react-icons/fa';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [riders, setRiders] = useState([]);
  const [selectedRider, setSelectedRider] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Simulate API call to fetch orders
    const fetchOrders = async () => {
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const mockOrders = [
          {
            id: 'ORD-1001',
            customer: 'John Smith',
            date: '2023-06-12',
            amount: 679.98,
            status: 'Delivered',
            products: [
              { id: 1, name: 'Premium Ceiling Fan', price: 129.99, quantity: 1, color: 'White', size: 'Medium' },
              { id: 3, name: 'Tower Fan', price: 89.99, quantity: 2, color: 'Black', size: 'Standard' }
            ],
            address: '123 Main St, Anytown, CA 12345',
            contact: '(555) 123-4567',
            email: 'john.smith@example.com',
            rider: 'Rider 3'
          },
          {
            id: 'ORD-1002',
            customer: 'Emily Johnson',
            date: '2023-06-11',
            amount: 549.99,
            status: 'Shipped',
            products: [
              { id: 2, name: 'Inverter Split AC', price: 549.99, quantity: 1, color: 'White', size: '1.5 Ton' }
            ],
            address: '456 Oak Ave, Somewhere, NY 67890',
            contact: '(555) 987-6543',
            email: 'emily.j@example.com',
            rider: 'Rider 1'
          },
          {
            id: 'ORD-1003',
            customer: 'Michael Brown',
            date: '2023-06-10',
            amount: 129.99,
            status: 'Paid',
            products: [
              { id: 1, name: 'Premium Ceiling Fan', price: 129.99, quantity: 1, color: 'Brown', size: 'Large' }
            ],
            address: '789 Pine St, Elsewhere, TX 54321',
            contact: '(555) 456-7890',
            email: 'mbrown@example.com',
            rider: null
          },
          {
            id: 'ORD-1004',
            customer: 'Sarah Wilson',
            date: '2023-06-09',
            amount: 479.97,
            status: 'Delivered',
            products: [
              { id: 7, name: 'Table Fan', price: 49.99, quantity: 1, color: 'Blue', size: 'Small' },
              { id: 4, name: 'Window AC', price: 429.98, quantity: 1, color: 'White', size: '1 Ton' }
            ],
            address: '101 Elm Rd, Nowhere, FL 13579',
            contact: '(555) 789-0123',
            email: 'sarah.w@example.com',
            rider: 'Rider 2'
          },
          {
            id: 'ORD-1005',
            customer: 'David Lee',
            date: '2023-06-08',
            amount: 1099.98,
            status: 'Shipped',
            products: [
              { id: 2, name: 'Inverter Split AC', price: 549.99, quantity: 2, color: 'White', size: '2 Ton' }
            ],
            address: '246 Maple Dr, Anywhere, WA 97531',
            contact: '(555) 234-5678',
            email: 'david.lee@example.com',
            rider: 'Rider 3'
          },
          {
            id: 'ORD-1006',
            customer: 'Jennifer Garcia',
            date: '2023-06-07',
            amount: 179.99,
            status: 'Paid',
            products: [
              { id: 5, name: 'Decorative Ceiling Fan', price: 179.99, quantity: 1, color: 'Bronze', size: 'Medium' }
            ],
            address: '369 Cedar Ln, Sometown, IL 86420',
            contact: '(555) 345-6789',
            email: 'jgarcia@example.com',
            rider: null
          },
          {
            id: 'ORD-1007',
            customer: 'Robert Martinez',
            date: '2023-06-06',
            amount: 329.99,
            status: 'Delivered',
            products: [
              { id: 6, name: 'Portable AC', price: 329.99, quantity: 1, color: 'White', size: 'Small' }
            ],
            address: '482 Birch Ave, Othertown, GA 75319',
            contact: '(555) 456-7890',
            email: 'rmartinez@example.com',
            rider: 'Rider 1'
          },
        ];
        
        const mockRiders = [
          { id: 1, name: 'Rider 1', phone: '(555) 111-2222', email: 'rider1@example.com', active: true },
          { id: 2, name: 'Rider 2', phone: '(555) 222-3333', email: 'rider2@example.com', active: true },
          { id: 3, name: 'Rider 3', phone: '(555) 333-4444', email: 'rider3@example.com', active: true },
          { id: 4, name: 'Rider 4', phone: '(555) 444-5555', email: 'rider4@example.com', active: false },
        ];
        
        setOrders(mockOrders);
        setRiders(mockRiders);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setLoading(false);
      }
    };
    
    fetchOrders();
  }, []);
  
  // Filter orders based on search term and status filter
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter ? order.status === statusFilter : true;
    
    return matchesSearch && matchesStatus;
  });
  
  const handleStatusChange = (orderId, newStatus, riderId = null) => {
    // In a real app, this would update the order status via API
    // For this demo, we'll update it locally
    const updatedOrders = orders.map(order => {
      if (order.id === orderId) {
        // If changing from Paid to Shipped, a rider must be assigned
        if (order.status === 'Paid' && newStatus === 'Shipped') {
          if (!riderId) {
            setError('You must assign a rider when changing status to Shipped');
            return order;
          }
          
          // Find the rider by ID
          const assignedRider = riders.find(rider => rider.id === parseInt(riderId));
          if (!assignedRider) {
            setError('Selected rider not found');
            return order;
          }
          
          return { 
            ...order, 
            status: newStatus,
            rider: assignedRider.name
          };
        }
        
        return { ...order, status: newStatus };
      }
      return order;
    });
    
    setOrders(updatedOrders);
    
    if (selectedOrder?.id === orderId) {
      const updatedOrder = updatedOrders.find(order => order.id === orderId);
      setSelectedOrder(updatedOrder);
    }
    
    setError('');
  };
  
  const handleAssignRider = () => {
    if (!selectedOrder || !selectedRider) return;
    
    // In a real app, this would assign the rider via API
    // For this demo, we'll update it locally
    const updatedOrders = orders.map(order => 
      order.id === selectedOrder.id ? { ...order, rider: selectedRider, status: 'Shipped' } : order
    );
    
    setOrders(updatedOrders);
    setSelectedOrder({ ...selectedOrder, rider: selectedRider, status: 'Shipped' });
    setSelectedRider('');
  };
  
  const viewOrderDetails = (order) => {
    setSelectedOrder(order);
  };
  
  const closeOrderDetails = () => {
    setSelectedOrder(null);
    setSelectedRider('');
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
        <h1 className="text-2xl font-bold">Manage Orders</h1>
        <Link to="/admin" className="text-primary hover:text-primary-dark flex items-center">
          <FaArrowLeft className="mr-2" /> Back to Dashboard
        </Link>
      </div>
      
      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="Search orders by ID, customer, or email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="md:w-48">
            <select
              className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Statuses</option>
              <option value="Paid">Paid</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rider
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                    No orders found matching your filters
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order.customer}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${order.amount.toFixed(2)}
                    </td>
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.rider || 'Not assigned'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => viewOrderDetails(order)}
                          className="text-primary hover:text-primary-dark"
                          title="View Details"
                        >
                          <FaEye />
                        </button>
                        {order.status === 'Paid' && (
                          <button
                            onClick={() => handleStatusChange(order.id, 'Shipped')}
                            className="text-blue-600 hover:text-blue-800"
                            title="Mark as Shipped"
                          >
                            <FaTruck />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Order Details: {selectedOrder.id}</h2>
                <button 
                  onClick={closeOrderDetails}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="text-2xl">&times;</span>
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Customer Information</h3>
                  <p className="text-sm mb-1"><span className="font-medium">Name:</span> {selectedOrder.customer}</p>
                  <p className="text-sm mb-1"><span className="font-medium">Email:</span> {selectedOrder.email}</p>
                  <p className="text-sm mb-1"><span className="font-medium">Phone:</span> {selectedOrder.contact}</p>
                  <p className="text-sm"><span className="font-medium">Address:</span> {selectedOrder.address}</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Order Information</h3>
                  <p className="text-sm mb-1"><span className="font-medium">Date:</span> {selectedOrder.date}</p>
                  <p className="text-sm mb-1"><span className="font-medium">Status:</span> 
                    <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      selectedOrder.status === 'Delivered' 
                        ? 'bg-green-100 text-green-800' 
                        : selectedOrder.status === 'Shipped' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {selectedOrder.status}
                    </span>
                  </p>
                  <p className="text-sm mb-1"><span className="font-medium">Total Amount:</span> ${selectedOrder.amount.toFixed(2)}</p>
                  {selectedOrder.rider && (
                    <p className="text-sm"><span className="font-medium">Assigned Rider:</span> {selectedOrder.rider}</p>
                  )}
                </div>
              </div>
              
              <h3 className="font-medium text-gray-900 mb-2">Order Items</h3>
              <div className="bg-gray-50 rounded-lg overflow-hidden mb-6">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {selectedOrder.products.map((product, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {product.color}, {product.size}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.quantity}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${(product.price * product.quantity).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="border-t pt-4">
                <h3 className="font-medium text-gray-900 mb-3">Update Order Status</h3>
                
                {selectedOrder.status === 'Paid' && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Assign Rider (required to ship)
                    </label>
                    <div className="flex gap-3">
                      <select
                        className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                        value={selectedRider}
                        onChange={(e) => setSelectedRider(e.target.value)}
                      >
                        <option value="">Select a Rider</option>
                        {riders.filter(rider => rider.active).map((rider) => (
                          <option key={rider.id} value={rider.id}>
                            {rider.name}
                          </option>
                        ))}
                      </select>
                      
                      <button
                        onClick={() => handleStatusChange(selectedOrder.id, 'Shipped', selectedRider)}
                        className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                      >
                        <FaTruck className="mr-2" /> Ship Order
                      </button>
                    </div>
                    {error && (
                      <p className="mt-1 text-sm text-red-600">{error}</p>
                    )}
                  </div>
                )}
                
                {selectedOrder.status === 'Shipped' && (
                  <button
                    onClick={() => handleStatusChange(selectedOrder.id, 'Delivered')}
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition mr-3"
                  >
                    Mark as Delivered
                  </button>
                )}
                
                {/* Add other status change buttons as needed */}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders; 