import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { CartProvider } from './contexts/CartContext';
import ToastProvider from './contexts/ToastContext';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import ProductListing from './pages/ProductListing';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminDashboard from './pages/admin/Dashboard';
import AdminOrders from './pages/admin/Orders';
import AdminRiders from './pages/admin/Riders';
import RiderDashboard from './pages/rider/Dashboard';
import RiderOrders from './pages/rider/Orders';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';

// Google OAuth client ID
const googleClientId = "748669976641-vlri9q3aas9le014i38v7pin681uoi61.apps.googleusercontent.com"; // Correct client ID from backend .env

// Custom error boundary for Google OAuth provider
function SafeGoogleOAuthProvider({ children }) {
  // This component catches errors in the Google OAuth Provider
  const [error, setError] = useState(null);

  if (error) {
    console.error('Google OAuth Provider Error:', error);
    // Just render children without the provider if it fails
    return children;
  }

  return (
    <GoogleOAuthProvider 
      clientId={googleClientId}
      onError={(err) => {
        console.error('Google OAuth Error:', err);
        setError(err);
      }}
    >
      {children}
    </GoogleOAuthProvider>
  );
}

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);
  
  // Check if current page is login or signup
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';
  
  // Login handler to be passed to Login component
  const handleLogin = (userData, role) => {
    setUser(userData);
    setUserRole(role);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('userRole', role);
  };
  
  // Logout handler
  const handleLogout = () => {
    setUser(null);
    setUserRole(null);
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
  };
  
  // Load user from localStorage on initial render
  useEffect(() => {
    console.log('Running auth check. Current path:', location.pathname);
    const storedUser = localStorage.getItem('user');
    const storedUserRole = localStorage.getItem('userRole');
    
    console.log('Stored user role from localStorage:', storedUserRole);
    
    if (storedUser && storedUserRole) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setUserRole(storedUserRole);
        
        console.log('User authenticated with role:', storedUserRole);
        
        // Always redirect to the appropriate dashboard if the user is at the root path
        if (location.pathname === '/') {
          if (storedUserRole === 'admin') {
            console.log('Redirecting authenticated admin to dashboard');
            navigate('/admin');
          } else if (storedUserRole === 'rider') {
            console.log('Redirecting authenticated rider to dashboard');
            navigate('/rider');
          }
        }
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('userRole');
      }
    } else {
      console.log('No authenticated user found');
    }
    
    setLoading(false);
  }, [location.pathname, navigate]);
  
  // Protected route components
  const ProtectedRoute = ({ children, allowedRoles }) => {
    console.log('ProtectedRoute check - User role:', userRole, 'Allowed roles:', allowedRoles);
    
    if (loading) {
      console.log('ProtectedRoute - Still loading user data');
      return <div className="h-screen flex items-center justify-center">Loading...</div>;
    }
    
    if (!user) {
      console.log('ProtectedRoute - No user, redirecting to login');
      return <Navigate to="/login" />;
    }
    
    if (allowedRoles && !allowedRoles.includes(userRole)) {
      console.log(`ProtectedRoute - User role ${userRole} not allowed, redirecting to home`);
      return <Navigate to="/" />;
    }
    
    console.log('ProtectedRoute - Access granted to', userRole);
    return children;
  };

  return (
    <div className="flex flex-col min-h-screen">
      {!isAuthPage && <Header user={user} userRole={userRole} onLogout={handleLogout} />}
      
      {isAuthPage && (
        <div className="bg-primary text-white py-4 text-center">
          <h1 className="text-3xl font-bold">CoolBreeze</h1>
          <p className="text-sm">Your One-Stop Shop for Fans & AC Solutions</p>
        </div>
      )}
      
      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductListing />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          
          {/* Auth Routes */}
          <Route path="/signup" element={<Signup onLogin={handleLogin} />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          
          {/* Protected Routes */}
          <Route path="/cart" element={user ? <Cart /> : <Navigate to="/login" state={{ from: "/cart" }} />} />
          
          {/* Protected Customer Routes */}
          <Route 
            path="/checkout" 
            element={
              user ? (
                !['customer', 'admin'].includes(userRole) ? 
                <Navigate to="/" /> : <Checkout />
              ) : <Navigate to="/login" state={{ from: "/checkout" }} />
            }
          />
          
          <Route 
            path="/order-confirmation" 
            element={
              user ? (
                !['customer', 'admin'].includes(userRole) ? 
                <Navigate to="/" /> : <OrderConfirmation />
              ) : <Navigate to="/login" state={{ from: "/order-confirmation" }} />
            }
          />
          
          {/* Admin Routes */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/orders" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminOrders />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/riders" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminRiders />
              </ProtectedRoute>
            } 
          />
          
          {/* Rider Routes */}
          <Route 
            path="/rider" 
            element={
              <ProtectedRoute allowedRoles={['rider']}>
                <RiderDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/rider/orders" 
            element={
              <ProtectedRoute allowedRoles={['rider']}>
                <RiderOrders />
              </ProtectedRoute>
            } 
          />
          
          {/* Profile Route */}
          <Route path="/profile" element={<Profile user={user} setUser={setUser} />} />
          
          {/* 404 Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      
      {!isAuthPage && <Footer />}
    </div>
  );
}

function App() {
  return (
    <SafeGoogleOAuthProvider>
      <ToastProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </ToastProvider>
    </SafeGoogleOAuthProvider>
  );
}

export default App; 