import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa';
import { GoogleLogin } from '@react-oauth/google';
import api from '../services/api';

// API base URL is now handled by the api service
// const API_URL = 'http://localhost:5000/api';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      console.log('Attempting login with:', formData.email);
      
      // Send login request using our API service
      const response = await api.post('/auth/login', {
        email: formData.email,
        password: formData.password,
      });

      // Handle successful login
      if (response.data.success) {
        // Create user object for login state
        const userData = {
          id: response.data.user.id,
          name: response.data.user.name,
          email: response.data.user.email,
          role: response.data.user.role,
          token: response.data.token
        };

        console.log('Login successful. User role:', userData.role);

        // Set auth header for future requests
        api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

        // Call login handler from parent
        onLogin(userData, userData.role);
        
        // Check localStorage immediately after setting
        setTimeout(() => {
          const storedUserRole = localStorage.getItem('userRole');
          console.log('Stored user role in localStorage:', storedUserRole);
          
          // Force redirect based on role after storage is confirmed
          if (storedUserRole === 'admin') {
            console.log('Forced redirect to admin dashboard');
            window.location.href = '/admin';
            return;
          } else if (storedUserRole === 'rider') {
            console.log('Forced redirect to rider dashboard');
            window.location.href = '/rider';
            return;
          }
        }, 100);

        // Redirect based on role or back to the page they came from
        if (userData.role === 'admin') {
          console.log('Redirecting to admin dashboard');
          navigate('/admin');
        } else if (userData.role === 'rider') {
          console.log('Redirecting to rider dashboard');
          navigate('/rider');
        } else {
          console.log('Redirecting to:', from);
          navigate(from);
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(
        error.response?.data?.message || 
        'Failed to log in. Please check your credentials and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle Google login success
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setLoading(true);
      setError('');

      console.log('Google login response:', credentialResponse);
      
      // For development: Extract info from credential or use default values
      let email = 'google-user@example.com';
      let name = 'Google User';
      
      try {
        if (credentialResponse.email) {
          email = credentialResponse.email;
        }
        if (credentialResponse.name) {
          name = credentialResponse.name;
        }
      } catch (e) {
        console.log('Could not extract email/name from credential');
      }

      // Use the Google endpoint with our API service (fixed endpoint name)
      const response = await api.post('/auth/google', {
        tokenId: credentialResponse.credential, // Send the credential token
        email: email,
        name: name
      });

      // Handle successful login
      if (response.data.success) {
        // Create user object for login state
        const userData = {
          id: response.data.user.id,
          name: response.data.user.name,
          email: response.data.user.email,
          role: response.data.user.role,
          token: response.data.token
        };

        // Set auth header for future requests
        api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

        // Call login handler from parent
        onLogin(userData, userData.role);

        // Redirect based on role or back to the page they came from
        if (userData.role === 'admin') {
          navigate('/admin');
        } else if (userData.role === 'rider') {
          navigate('/rider');
        } else {
          navigate(from);
        }
      }
    } catch (error) {
      console.error('Google login error:', error);
      setError(
        error.response?.data?.message || 
        'Failed to authenticate with Google. Please try again or use email login.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    setError('Google sign-in failed. Please try again or use email login.');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md -space-y-px">
            <div className="mb-4">
              <label htmlFor="email" className="sr-only">Email address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-lg relative block w-full pl-10 py-3 px-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="sr-only">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-lg relative block w-full pl-10 py-3 px-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-primary hover:text-primary-dark">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-white bg-primary hover:bg-primary-dark focus:outline-none"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <FaSignInAlt className="h-5 w-5 text-primary-light group-hover:text-white" />
              </span>
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              useOneTap
            />
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Don't have an account? <Link to="/signup" className="font-medium text-primary hover:text-primary-dark">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login; 