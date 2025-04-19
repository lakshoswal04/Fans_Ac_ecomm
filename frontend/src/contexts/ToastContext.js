import React, { createContext, useContext, useState, useEffect } from 'react';
import { FaCheck, FaShoppingCart, FaTimes } from 'react-icons/fa';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  // Remove toast after timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      if (toasts.length > 0) {
        setToasts(prevToasts => prevToasts.slice(1));
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [toasts]);

  // Add a toast notification
  const showToast = (message, type = 'success', icon = null) => {
    const id = Date.now();
    
    // Default icons based on type
    if (!icon) {
      switch (type) {
        case 'success':
          icon = <FaCheck />;
          break;
        case 'cart':
          icon = <FaShoppingCart />;
          break;
        case 'error':
          icon = <FaTimes />;
          break;
        default:
          icon = <FaCheck />;
      }
    }
    
    setToasts(prevToasts => [...prevToasts, { id, message, type, icon }]);
  };

  // Remove a specific toast
  const removeToast = (id) => {
    setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      
      {/* Toast container */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map(toast => (
          <div 
            key={toast.id} 
            className={`
              flex items-center p-3 rounded-lg shadow-lg min-w-64 max-w-md
              animate-slideIn
              ${toast.type === 'success' ? 'bg-green-500 text-white' : ''}
              ${toast.type === 'error' ? 'bg-red-500 text-white' : ''}
              ${toast.type === 'cart' ? 'bg-primary text-white' : ''}
            `}
          >
            <div className="mr-3">
              {toast.icon}
            </div>
            <p className="flex-1">{toast.message}</p>
            <button 
              onClick={() => removeToast(toast.id)}
              className="ml-2 text-white/80 hover:text-white"
            >
              <FaTimes size={16} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export default ToastProvider; 