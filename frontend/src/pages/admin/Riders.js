import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaSearch, FaEdit, FaTrash, FaCheck, FaTimes } from 'react-icons/fa';

const AdminRiders = () => {
  const [riders, setRiders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterActive, setFilterActive] = useState('');
  const [selectedRider, setSelectedRider] = useState(null);
  
  useEffect(() => {
    // Simulate API call to fetch riders
    const fetchRiders = async () => {
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const mockRiders = [
          {
            id: 1,
            name: 'John Rider',
            email: 'rider1@example.com',
            phone: '(555) 111-2222',
            address: '123 Delivery St, Cityville, CA 95123',
            joinDate: '2023-01-15',
            active: true,
            orders: [
              { id: 'ORD-1002', date: '2023-06-11', status: 'Shipped' },
              { id: 'ORD-1007', date: '2023-06-06', status: 'Delivered' }
            ]
          },
          {
            id: 2,
            name: 'Sarah Delivery',
            email: 'rider2@example.com',
            phone: '(555) 222-3333',
            address: '456 Transport Ave, Riderville, NY 10001',
            joinDate: '2023-02-20',
            active: true,
            orders: [
              { id: 'ORD-1004', date: '2023-06-09', status: 'Delivered' }
            ]
          },
          {
            id: 3,
            name: 'Michael Express',
            email: 'rider3@example.com',
            phone: '(555) 333-4444',
            address: '789 Quick Ln, Speedtown, TX 77001',
            joinDate: '2023-03-05',
            active: true,
            orders: [
              { id: 'ORD-1001', date: '2023-06-12', status: 'Delivered' },
              { id: 'ORD-1005', date: '2023-06-08', status: 'Shipped' }
            ]
          },
          {
            id: 4,
            name: 'Linda Swift',
            email: 'rider4@example.com',
            phone: '(555) 444-5555',
            address: '101 Fast Blvd, Rushville, FL 33601',
            joinDate: '2023-04-10',
            active: false,
            orders: []
          },
          {
            id: 5,
            name: 'Robert Speedy',
            email: 'rider5@example.com',
            phone: '(555) 555-6666',
            address: '202 Prompt St, Swiftcity, WA 98001',
            joinDate: '2023-05-15',
            active: true,
            orders: []
          }
        ];
        
        setRiders(mockRiders);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching riders:', error);
        setLoading(false);
      }
    };
    
    fetchRiders();
  }, []);
  
  // Filter riders based on search term and active filter
  const filteredRiders = riders.filter(rider => {
    const matchesSearch = 
      rider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rider.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rider.phone.includes(searchTerm);
    
    const matchesActive = 
      filterActive === 'active' ? rider.active : 
      filterActive === 'inactive' ? !rider.active : 
      true;
    
    return matchesSearch && matchesActive;
  });
  
  const handleToggleActive = (riderId) => {
    // In a real app, this would update the rider status via API
    // For this demo, we'll update it locally
    const updatedRiders = riders.map(rider => 
      rider.id === riderId ? { ...rider, active: !rider.active } : rider
    );
    
    setRiders(updatedRiders);
    
    if (selectedRider?.id === riderId) {
      setSelectedRider({ ...selectedRider, active: !selectedRider.active });
    }
  };
  
  const viewRiderDetails = (rider) => {
    setSelectedRider(rider);
  };
  
  const closeRiderDetails = () => {
    setSelectedRider(null);
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
        <h1 className="text-2xl font-bold">Manage Riders</h1>
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
              placeholder="Search riders by name, email, or phone"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="md:w-48">
            <select
              className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              value={filterActive}
              onChange={(e) => setFilterActive(e.target.value)}
            >
              <option value="">All Riders</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Riders Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact Info
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Join Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Active Orders
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
              {filteredRiders.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                    No riders found matching your filters
                  </td>
                </tr>
              ) : (
                filteredRiders.map((rider) => (
                  <tr key={rider.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                          {rider.name.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{rider.name}</div>
                          <div className="text-sm text-gray-500">ID: {rider.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{rider.email}</div>
                      <div className="text-sm text-gray-500">{rider.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {rider.joinDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {rider.orders.filter(order => order.status === 'Shipped').length}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        rider.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {rider.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-3">
                        <button
                          onClick={() => viewRiderDetails(rider)}
                          className="text-indigo-600 hover:text-indigo-900"
                          title="View Details"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleToggleActive(rider.id)}
                          className={rider.active ? "text-red-600 hover:text-red-900" : "text-green-600 hover:text-green-900"}
                          title={rider.active ? "Deactivate" : "Activate"}
                        >
                          {rider.active ? <FaTimes /> : <FaCheck />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Rider Details Modal */}
      {selectedRider && (
        <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="relative bg-white rounded-lg max-w-3xl w-full mx-4 p-6 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Rider Details: {selectedRider.name}</h2>
              <button onClick={closeRiderDetails} className="text-gray-500 hover:text-gray-700">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-semibold mb-2">Personal Information</h3>
                <p className="text-sm mb-1"><span className="font-medium">Name:</span> {selectedRider.name}</p>
                <p className="text-sm mb-1"><span className="font-medium">Email:</span> {selectedRider.email}</p>
                <p className="text-sm mb-1"><span className="font-medium">Phone:</span> {selectedRider.phone}</p>
                <p className="text-sm mb-1"><span className="font-medium">Address:</span> {selectedRider.address}</p>
                <p className="text-sm mb-1"><span className="font-medium">Join Date:</span> {selectedRider.joinDate}</p>
                <p className="text-sm mb-1">
                  <span className="font-medium">Status:</span> 
                  <span className={`ml-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    selectedRider.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {selectedRider.active ? 'Active' : 'Inactive'}
                  </span>
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Actions</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => handleToggleActive(selectedRider.id)}
                    className={`w-full py-2 px-4 rounded-md text-white ${
                      selectedRider.active 
                        ? 'bg-red-500 hover:bg-red-600' 
                        : 'bg-green-500 hover:bg-green-600'
                    }`}
                  >
                    {selectedRider.active ? 'Deactivate Rider' : 'Activate Rider'}
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Assigned Orders</h3>
              {selectedRider.orders.length === 0 ? (
                <div className="bg-gray-50 rounded-md p-4 text-center text-gray-500">
                  No orders assigned to this rider
                </div>
              ) : (
                <div className="bg-gray-50 rounded-md overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                      <tr>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Order ID
                        </th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Date
                        </th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {selectedRider.orders.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-100">
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-blue-600">
                            {order.id}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                            {order.date}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              order.status === 'Delivered' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            
            <div className="flex justify-end">
              <button
                onClick={closeRiderDetails}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminRiders; 