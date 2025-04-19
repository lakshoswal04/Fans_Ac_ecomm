import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaSearch, FaEye, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const RiderOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [undeliveredReason, setUndeliveredReason] = useState('');
  const [showUndeliveredInput, setShowUndeliveredInput] = useState(false);
  
  useEffect(() => {
    // Simulate API call to fetch orders
    const fetchOrders = async () => {
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const mockOrders = [
          {
            id: 'ORD-1002',
            customer: 'Emily Johnson',
            address: '456 Oak Ave, Somewhere, NY 67890',
            contact: '(555) 987-6543',
            email: 'emily.j@example.com',
            date: '2023-06-11',
            status: 'Shipped',
            items: [
              { id: 2, name: 'Inverter Split AC', price: 549.99, quantity: 1, color: 'White', size: '1.5 Ton' }
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
              { id: 2, name: 'Inverter Split AC', price: 549.99, quantity: 2, color: 'White', size: '2 Ton' }
            ]
          },
          {
            id: 'ORD-1007',
            customer: 'Robert Martinez',
            address: '482 Birch Ave, Othertown, GA 75319',
            contact: '(555) 456-7890',
            email: 'rmartinez@example.com',
            date: '2023-06-06',
            status: 'Delivered',
            items: [
              { id: 6, name: 'Portable AC', price: 329.99, quantity: 1, color: 'White', size: 'Small' }
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
              { id: 1, name: 'Premium Ceiling Fan', price: 129.99, quantity: 1, color: 'Black', size: 'Medium' },
              { id: 7, name: 'Table Fan', price: 49.99, quantity: 1, color: 'Blue', size: 'Small' }
            ]
          },
          {
            id: 'ORD-1010',
            customer: 'Thomas Brown',
            address: '321 Pine St, Elsewhere, TX 54321',
            contact: '(555) 789-0123',
            email: 'tbrown@example.com',
            date: '2023-06-05',
            status: 'Delivered',
            items: [
              { id: 5, name: 'Decorative Ceiling Fan', price: 179.99, quantity: 1, color: 'Bronze', size: 'Large' }
            ]
          },
          {
            id: 'ORD-1011',
            customer: 'Jessica Taylor',
            address: '159 Elm St, Anytown, CA 12345',
            contact: '(555) 234-5678',
            email: 'jtaylor@example.com',
            date: '2023-06-04',
            status: 'Undelivered',
            items: [
              { id: 3, name: 'Tower Fan', price: 89.99, quantity: 1, color: 'Black', size: 'Standard' }
            ],
            notes: 'Customer not available at delivery time'
          }
        ];
        
        setOrders(mockOrders);
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
      order.address.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter ? order.status === statusFilter : true;
    
    return matchesSearch && matchesStatus;
  });
  
  const updateOrderStatus = (orderId, newStatus, note = '') => {
    // Validate status
    if (newStatus !== 'Delivered' && newStatus !== 'Undelivered') {
      console.error('Invalid status', newStatus);
      return;
    }
    
    // In a real app, this would update the order status via API
    // For this demo, we'll update it locally
    const updatedOrders = orders.map(order => {
      if (order.id === orderId) {
        const updatedOrder = { 
          ...order, 
          status: newStatus 
        };
        
        // Add note if provided and status is Undelivered
        if (newStatus === 'Undelivered' && note) {
          updatedOrder.notes = note;
        }
        
        return updatedOrder;
      }
      return order;
    });
    
    setOrders(updatedOrders);
    
    if (selectedOrder?.id === orderId) {
      const updatedOrder = updatedOrders.find(order => order.id === orderId);
      setSelectedOrder(updatedOrder);
    }
    
    // Reset undelivered input state
    setShowUndeliveredInput(false);
    setUndeliveredReason('');
  };
  
  const handleUndeliveredSubmit = () => {
    if (undeliveredReason.trim()) {
      updateOrderStatus(selectedOrder.id, 'Undelivered', undeliveredReason);
    } else {
      alert('Please provide a reason for not delivering the order');
    }
  };
  
  const viewOrderDetails = (order) => {
    setSelectedOrder(order);
  };
  
  const closeOrderDetails = () => {
    setSelectedOrder(null);
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
        <h1 className="text-2xl font-bold">My Orders</h1>
        <Link to="/rider" className="text-primary hover:text-primary-dark flex items-center">
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
              placeholder="Search by order ID, customer, or address"
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
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Undelivered">Undelivered</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Orders List */}
      <div className="bg-white rounded-lg shadow-md">
        {filteredOrders.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No orders found matching your filters
          </div>
        ) : (
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
                    Items
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map((order) => (
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
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <div className="max-w-xs truncate">
                        {order.items.map(item => `${item.name} x ${item.quantity}`).join(', ')}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        order.status === 'Delivered' 
                          ? 'bg-green-100 text-green-800' 
                          : order.status === 'Shipped' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {order.status}
                      </span>
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
                        {order.status === 'Shipped' && (
                          <>
                            <button
                              onClick={() => updateOrderStatus(order.id, 'Delivered')}
                              className="text-green-600 hover:text-green-800"
                              title="Mark as Delivered"
                            >
                              <FaCheckCircle />
                            </button>
                            <button
                              onClick={() => updateOrderStatus(order.id, 'Undelivered')}
                              className="text-red-600 hover:text-red-800"
                              title="Mark as Undelivered"
                            >
                              <FaTimesCircle />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
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
                        : selectedOrder.status === 'Undelivered'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {selectedOrder.status}
                    </span>
                  </p>
                  {selectedOrder.notes && (
                    <p className="text-sm mb-1"><span className="font-medium">Notes:</span> {selectedOrder.notes}</p>
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
                    {selectedOrder.items.map((item, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.color || '-'}, {item.size || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.quantity}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${(item.price * item.quantity).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Status Update Section */}
              {selectedOrder.status === 'Shipped' && (
                <div className="border-t pt-4">
                  <h3 className="font-medium text-gray-900 mb-3">Update Order Status</h3>
                  
                  {showUndeliveredInput ? (
                    <div className="bg-gray-50 p-4 rounded-md mb-4">
                      <label htmlFor="undeliveredReason" className="block text-sm font-medium text-gray-700 mb-2">
                        Please provide a reason for not delivering:
                      </label>
                      <textarea
                        id="undeliveredReason"
                        rows="3"
                        className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-primary focus:border-primary"
                        value={undeliveredReason}
                        onChange={(e) => setUndeliveredReason(e.target.value)}
                        placeholder="Enter the reason why the order couldn't be delivered..."
                      ></textarea>
                      <div className="mt-3 flex justify-end space-x-3">
                        <button
                          onClick={() => setShowUndeliveredInput(false)}
                          className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleUndeliveredSubmit}
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
                        onClick={() => updateOrderStatus(selectedOrder.id, 'Delivered')}
                        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                      >
                        <FaCheckCircle className="inline-block mr-2" /> Mark as Delivered
                      </button>
                      
                      <button
                        onClick={() => setShowUndeliveredInput(true)}
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                      >
                        <FaTimesCircle className="inline-block mr-2" /> Mark as Undelivered
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RiderOrders; 