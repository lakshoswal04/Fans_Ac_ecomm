import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
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
  
  // Check for stored user on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedRole = localStorage.getItem('userRole');
    
    if (storedUser && storedRole) {
      setUser(JSON.parse(storedUser));
      setUserRole(storedRole);
    }
    
    setLoading(false);
  }, []);

  // Protected route components
  const ProtectedRoute = ({ children, allowedRoles }) => {
    if (loading) {
      return <div className="h-screen flex items-center justify-center">Loading...</div>;
    }
    
    if (!user) {
      return <Navigate to="/login" />;
    }
    
    if (allowedRoles && !allowedRoles.includes(userRole)) {
      return <Navigate to="/" />;
    }
    
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