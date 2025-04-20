import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaBars, FaTimes, FaUserCircle, FaChevronDown } from 'react-icons/fa';
import { useCart } from '../contexts/CartContext';

const Header = ({ user, userRole, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { getCartCount } = useCart();
  
  const cartCount = getCartCount();
  
  // Check if current page is admin or rider dashboard
  const isAdminDashboard = location.pathname.startsWith('/admin');
  const isRiderDashboard = location.pathname.startsWith('/rider');
  const isRestrictedDashboard = isAdminDashboard || isRiderDashboard;

  const handleLogout = () => {
    onLogout();
    navigate('/');
    setIsProfileOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Regular header for other pages
  return (
    <header className="bg-white shadow-custom sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary">CoolBreeze</span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-600 focus:outline-none p-2 rounded-lg hover:bg-gray-100"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link to="/" className={`px-4 py-2 rounded-lg text-gray-700 hover:text-primary hover:bg-primary/5 transition font-medium ${location.pathname === '/' ? 'text-primary bg-primary/5' : ''}`}>
              Home
            </Link>
            <Link to="/products" className={`px-4 py-2 rounded-lg text-gray-700 hover:text-primary hover:bg-primary/5 transition font-medium ${location.pathname === '/products' ? 'text-primary bg-primary/5' : ''}`}>
              Products
            </Link>
            
            {/* Conditional Navigation based on User Role */}
            {userRole === 'admin' && (
              <Link to="/admin" className={`px-4 py-2 rounded-lg text-gray-700 hover:text-primary hover:bg-primary/5 transition font-medium ${location.pathname.startsWith('/admin') ? 'text-primary bg-primary/5' : ''}`}>
                Admin Panel
              </Link>
            )}
            
            {userRole === 'rider' && (
              <Link to="/rider" className={`px-4 py-2 rounded-lg text-gray-700 hover:text-primary hover:bg-primary/5 transition font-medium ${location.pathname.startsWith('/rider') ? 'text-primary bg-primary/5' : ''}`}>
                Rider Dashboard
              </Link>
            )}

            {/* User Menu */}
            <div className="flex items-center pl-4 space-x-3 ml-4 border-l border-gray-200">
              <Link to="/cart" className="text-gray-700 hover:text-primary transition relative p-2 rounded-full hover:bg-primary/5">
                <FaShoppingCart size={20} />
                {user && cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-white text-xs w-5 h-5 flex items-center justify-center rounded-full shadow-lg">
                    {cartCount}
                  </span>
                )}
              </Link>
              
              {user ? (
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={toggleProfile}
                    className="flex items-center text-gray-700 hover:text-primary transition rounded-full p-1"
                  >
                    {user.picture ? (
                      <img 
                        src={user.picture} 
                        alt={user.name} 
                        className="w-8 h-8 rounded-full border border-gray-200"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white hover:bg-primary-dark transition">
                        <span className="font-medium text-sm">{user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}</span>
                      </div>
                    )}
                  </button>
                  
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-custom py-2 z-10">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm text-gray-500">Signed in as</p>
                        <p className="font-medium text-gray-800 truncate">{user?.email}</p>
                      </div>
                      <Link
                        to="/profile"
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <div className="flex items-center">
                          <FaUserCircle className="mr-2 text-primary" />
                          <span>My Profile</span>
                        </div>
                      </Link>
                      <Link
                        to="/cart"
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <FaShoppingCart className="mr-3 text-primary" />
                            <span>My Cart</span>
                          </div>
                          {user && cartCount > 0 && (
                            <span className="bg-accent/10 text-accent px-2 py-1 rounded-full text-xs font-medium">
                              {cartCount} items
                            </span>
                          )}
                        </div>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link to="/login" className="flex items-center text-gray-700 hover:text-primary bg-gray-50 hover:bg-primary/5 px-4 py-2 rounded-lg transition font-medium">
                    <FaUser className="mr-2" size={14} />
                    <span>Sign In</span>
                  </Link>
                  <Link to="/signup" className="flex items-center text-white bg-primary hover:bg-primary-dark px-4 py-2 rounded-lg transition font-medium">
                    <span>Sign Up</span>
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="bg-white h-full w-4/5 max-w-sm py-4 px-6 flex flex-col shadow-xl">
            <div className="flex justify-between items-center mb-8">
              <Link 
                to="/" 
                className="text-2xl font-bold text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                CoolBreeze
              </Link>
              <button onClick={toggleMenu} className="text-gray-600 p-2">
                <FaTimes size={24} />
              </button>
            </div>
            
            <nav className="flex-1">
              <ul className="space-y-1">
                <li>
                  <Link
                    to="/"
                    className={`block px-4 py-3 rounded-lg transition font-medium ${location.pathname === '/' ? 'text-primary bg-primary/5' : 'text-gray-700 hover:text-primary hover:bg-primary/5'}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products"
                    className={`block px-4 py-3 rounded-lg transition font-medium ${location.pathname === '/products' ? 'text-primary bg-primary/5' : 'text-gray-700 hover:text-primary hover:bg-primary/5'}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Products
                  </Link>
                </li>
                
                {/* Conditional Navigation based on User Role */}
                {userRole === 'admin' && (
                  <li>
                    <Link
                      to="/admin"
                      className={`block px-4 py-3 rounded-lg transition font-medium ${location.pathname.startsWith('/admin') ? 'text-primary bg-primary/5' : 'text-gray-700 hover:text-primary hover:bg-primary/5'}`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Admin Panel
                    </Link>
                  </li>
                )}
                
                {userRole === 'rider' && (
                  <li>
                    <Link
                      to="/rider"
                      className={`block px-4 py-3 rounded-lg transition font-medium ${location.pathname.startsWith('/rider') ? 'text-primary bg-primary/5' : 'text-gray-700 hover:text-primary hover:bg-primary/5'}`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Rider Dashboard
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
            
            <div className="mt-8 pt-8 border-t border-gray-200">
              {user ? (
                <>
                  <div className="flex items-center mb-6">
                    {user.picture ? (
                      <img 
                        src={user.picture} 
                        alt={user.name} 
                        className="w-10 h-10 rounded-full border border-gray-200 mr-3"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white mr-3">
                        <span className="font-medium text-sm">{user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}</span>
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-gray-800">{user.name || 'User'}</p>
                      <p className="text-sm text-gray-500 truncate">{user.email}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Link
                      to="/profile"
                      className="flex items-center text-gray-700 hover:text-primary transition px-4 py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <FaUserCircle className="mr-3 text-primary" />
                      <span>My Profile</span>
                    </Link>
                    <Link
                      to="/cart"
                      className="flex items-center justify-between text-gray-700 hover:text-primary transition px-4 py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="flex items-center">
                        <FaShoppingCart className="mr-3 text-primary" />
                        <span>My Cart</span>
                      </div>
                      {user && cartCount > 0 && (
                        <span className="bg-accent/10 text-accent px-2 py-1 rounded-full text-xs font-medium">
                          {cartCount} items
                        </span>
                      )}
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center text-red-500 hover:text-red-700 transition w-full text-left px-4 py-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      <span>Sign Out</span>
                    </button>
                  </div>
                </>
              ) : (
                <div className="space-y-3">
                  <Link
                    to="/login"
                    className="flex items-center justify-center bg-primary text-white hover:bg-primary-dark transition rounded-lg px-4 py-3 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FaUser className="mr-2" size={14} />
                    <span>Sign In</span>
                  </Link>
                  <Link
                    to="/signup"
                    className="flex items-center justify-center bg-gray-100 text-gray-700 hover:bg-gray-200 transition rounded-lg px-4 py-3 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>Create Account</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header; 