import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaEdit, FaTrash } from 'react-icons/fa';
import api from '../services/api';

// API base URL is now handled by the api service
// const API_URL = 'http://localhost:5000/api';

const Profile = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  // Fetch user data on component mount
  useEffect(() => {
    if (!user || !user.token) {
      navigate('/login');
      return;
    }

    const fetchUserData = async () => {
      setLoading(true);
      setError('');
      try {
        // No need to manually set Authorization header - it's now handled by the API interceptor
        const response = await api.get('/users/profile');

        if (response.data.success) {
          const profile = response.data.user;
          setUserData({
            name: profile.name || '',
            email: profile.email || '',
            phone: profile.phone || '',
            address: profile.address || '',
          });
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
        
        if (err.response && err.response.status === 403) {
          // Authentication issue - token may be invalid or expired
          setError('Authentication error. Please log in again.');
          // Optional: You could auto-logout here
          // setUser(null);
          // localStorage.removeItem('user');
          // localStorage.removeItem('userRole');
          // navigate('/login');
        } else {
          setError('Failed to load profile data');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Set the auth token for this request
      api.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
      
      const response = await api.put('/users/profile', userData);

      if (response.data.success) {
        // Update the user context with new data
        setUser({
          ...user,
          name: userData.name,
          email: userData.email
        });
        
        setSuccess('Profile updated successfully');
        setIsEditing(false);
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      setLoading(true);
      try {
        // Set the auth token for this request
        api.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
        
        const response = await api.delete('/users/profile');

        if (response.data.success) {
          // Log out and redirect
          setUser(null);
          localStorage.removeItem('user');
          navigate('/login');
        }
      } catch (err) {
        console.error('Error deleting account:', err);
        setError(err.response?.data?.message || 'Failed to delete account');
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading && !userData.name) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-4 py-5 sm:px-6 bg-primary text-white">
          <h2 className="text-2xl font-bold">My Profile</h2>
          <p className="mt-1 text-sm">Manage your personal information and account</p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 m-4 rounded">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 m-4 rounded">
            {success}
          </div>
        )}

        <div className="px-4 py-5 sm:p-6">
          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUser className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={userData.name}
                      onChange={handleChange}
                      className="focus:ring-primary focus:border-primary block w-full pl-10 pr-3 py-2 sm:text-sm border border-gray-300 rounded-md"
                      placeholder="Your full name"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaEnvelope className="text-gray-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={userData.email}
                      onChange={handleChange}
                      className="focus:ring-primary focus:border-primary block w-full pl-10 pr-3 py-2 sm:text-sm border border-gray-300 rounded-md"
                      placeholder="you@example.com"
                      disabled
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">Email cannot be changed</p>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaPhone className="text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      value={userData.phone}
                      onChange={handleChange}
                      className="focus:ring-primary focus:border-primary block w-full pl-10 pr-3 py-2 sm:text-sm border border-gray-300 rounded-md"
                      placeholder="Your phone number"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaMapMarkerAlt className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="address"
                      id="address"
                      value={userData.address}
                      onChange={handleChange}
                      className="focus:ring-primary focus:border-primary block w-full pl-10 pr-3 py-2 sm:text-sm border border-gray-300 rounded-md"
                      placeholder="Your address"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="mr-3 inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          ) : (
            <div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                      <FaEdit className="mr-1" /> Edit Profile
                    </button>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500">Full Name</h4>
                  <p className="mt-1 flex items-center text-gray-900">
                    <FaUser className="mr-2 text-gray-400" />
                    {userData.name || 'Not provided'}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500">Email Address</h4>
                  <p className="mt-1 flex items-center text-gray-900">
                    <FaEnvelope className="mr-2 text-gray-400" />
                    {userData.email}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500">Phone Number</h4>
                  <p className="mt-1 flex items-center text-gray-900">
                    <FaPhone className="mr-2 text-gray-400" />
                    {userData.phone || 'Not provided'}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500">Address</h4>
                  <p className="mt-1 flex items-center text-gray-900">
                    <FaMapMarkerAlt className="mr-2 text-gray-400" />
                    {userData.address || 'Not provided'}
                  </p>
                </div>
              </div>

              <div className="mt-10 border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Account Management</h3>
                <button
                  onClick={handleDeleteAccount}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <FaTrash className="mr-2" /> Delete Account
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile; 