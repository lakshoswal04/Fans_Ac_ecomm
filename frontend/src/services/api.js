import axios from 'axios';

// API base URL
const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Handles server errors with fallback to mock data
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (!error.response || error.code === 'ECONNABORTED') {
      console.warn('Backend server unavailable, using mock data');
      
      const originalRequest = error.config;
      const url = originalRequest.url;
      const method = originalRequest.method;
      const data = originalRequest.data ? JSON.parse(originalRequest.data) : {};
      
      // Authentication endpoints
      if (url.includes('/auth/login')) {
        return mockLogin(data);
      } else if (url.includes('/auth/register')) {
        return mockRegister(data);
      } else if (url.includes('/auth/google')) {
        return mockGoogleAuth(data);
      } else if (url.includes('/auth/google-test')) {
        return mockGoogleAuth(data);
      }
      
      // User profile endpoints
      else if (url.includes('/users/profile')) {
        if (method === 'get') {
          return mockGetProfile();
        } else if (method === 'put') {
          return mockUpdateProfile(data);
        } else if (method === 'delete') {
          return mockDeleteProfile();
        }
      }
    }
    
    return Promise.reject(error);
  }
);

function mockLogin(data) {
  console.log('Using mock login with:', data);
  
  const { email, password } = data;
  
  if (email === 'admin@example.com' && password === 'password123') {
    return mockSuccess({
      user: {
        id: 'mock-admin-123',
        name: 'Test Admin',
        email: 'admin@example.com',
        role: 'admin'
      },
      token: 'mock-token-admin-123456'
    });
  } else if (email === 'rider@example.com' && password === 'password123') {
    return mockSuccess({
      user: {
        id: 'mock-rider-123',
        name: 'Test Rider',
        email: 'rider@example.com',
        role: 'rider'
      },
      token: 'mock-token-rider-123456'
    });
  } else if (email === 'customer@example.com' && password === 'password123') {
    return mockSuccess({
      user: {
        id: 'mock-customer-123',
        name: 'Test Customer',
        email: 'customer@example.com',
        role: 'customer'
      },
      token: 'mock-token-customer-123456'
    });
  } else if (email && password) {
    return mockSuccess({
      user: {
        id: 'mock-user-' + Date.now(),
        name: email.split('@')[0],
        email: email,
        role: 'customer'
      },
      token: 'mock-token-' + Date.now()
    });
  }
  
  return mockError('Invalid credentials');
}

function mockRegister(data) {
  console.log('Using mock register with:', data);
  
  const { name, email, password } = data;
  
  if (!name || !email || !password) {
    return mockError('Please provide all required fields');
  }
  
  let role = data.role || 'customer';
  if (email.includes('admin')) {
    role = 'admin';
  } else if (email.includes('rider')) {
    role = 'rider';
  }
  
  return mockSuccess({
    user: {
      id: 'mock-user-' + Date.now(),
      name: name,
      email: email,
      role: role
    },
    token: 'mock-token-' + Date.now()
  });
}

function mockGoogleAuth(data) {
  console.log('Using mock Google auth with:', data);
  
  return mockSuccess({
    user: {
      id: 'mock-google-user-' + Date.now(),
      name: data.name || 'Google User',
      email: data.email || 'google@example.com',
      role: 'customer'
    },
    token: 'mock-google-token-' + Date.now()
  });
}

function mockGetProfile() {
  console.log('Using mock get profile');
  
  return mockSuccess({
    user: {
      name: 'Mock User',
      email: 'user@example.com',
      phone: '123-456-7890',
      address: '123 Mock Street, Demo City',
    }
  });
}

function mockUpdateProfile(data) {
  console.log('Using mock update profile with:', data);
  
  return mockSuccess({
    user: {
      ...data,
      id: 'mock-user-123'
    }
  });
}

function mockDeleteProfile() {
  console.log('Using mock delete profile');
  
  return mockSuccess({
    message: 'Account deleted successfully'
  });
}

function mockSuccess(data) {
  return Promise.resolve({
    data: {
      success: true,
      ...data
    },
    status: 200
  });
}

function mockError(message, status = 400) {
  return Promise.reject({
    response: {
      data: {
        success: false,
        message: message
      },
      status: status
    }
  });
}

export default api; 