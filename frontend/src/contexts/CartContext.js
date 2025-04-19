import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartInitialized, setCartInitialized] = useState(false);
  
  // Load cart from localStorage on component mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        // Validate cart data is an array
        if (Array.isArray(parsedCart)) {
          setCart(parsedCart);
        } else {
          console.error('Invalid cart data format, resetting cart');
          localStorage.removeItem('cart');
        }
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      localStorage.removeItem('cart');
    } finally {
      setCartInitialized(true);
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (cartInitialized) {
      try {
        localStorage.setItem('cart', JSON.stringify(cart));
      } catch (error) {
        console.error('Error saving cart to localStorage:', error);
      }
    }
  }, [cart, cartInitialized]);
  
  // Add product to cart
  const addToCart = useCallback((product) => {
    if (!product || !product.id) {
      console.error('Invalid product:', product);
      return;
    }

    setCart(prevCart => {
      // Check if product already exists in cart
      const existingItemIndex = prevCart.findIndex(item => item.id === product.id);
      
      // Standardize the product structure
      const standardizedProduct = {
        id: product.id,
        name: product.name,
        image: product.image || (product.images ? product.images[0] : ''),
        price: parseFloat(product.price),
        category: product.category,
        // Include these if available
        color: product.color || product.selectedColor || '',
        size: product.size || product.selectedSize || '',
        quantity: product.quantity || 1
      };
      
      if (existingItemIndex >= 0) {
        // Increase quantity if product already in cart
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex] = { 
          ...updatedCart[existingItemIndex], 
          quantity: updatedCart[existingItemIndex].quantity + (product.quantity || 1)
        };
        return updatedCart;
      } else {
        // Add new product to cart
        return [...prevCart, standardizedProduct];
      }
    });
  }, []);
  
  // Remove product from cart
  const removeFromCart = useCallback((productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  }, []);
  
  // Update product quantity
  const updateQuantity = useCallback((productId, quantity) => {
    if (!productId) {
      console.error('Invalid product ID');
      return;
    }
    
    // Ensure quantity is a valid number
    const validQuantity = parseInt(quantity);
    if (isNaN(validQuantity)) {
      console.error('Invalid quantity:', quantity);
      return;
    }
  
    if (validQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prevCart => 
      prevCart.map(item => 
        item.id === productId 
          ? { ...item, quantity: validQuantity } 
          : item
      )
    );
  }, [removeFromCart]);
  
  // Clear the entire cart
  const clearCart = useCallback(() => {
    setCart([]);
    localStorage.removeItem('cart'); // Explicitly remove from localStorage
  }, []);
  
  // Get total number of items in cart
  const getCartCount = useCallback(() => {
    return cart.reduce((total, item) => total + (item.quantity || 0), 0);
  }, [cart]);
  
  // Get total price of all items in cart
  const getCartTotal = useCallback(() => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.price) || 0;
      const quantity = item.quantity || 0;
      return total + (price * quantity);
    }, 0);
  }, [cart]);
  
  // Add a function to check if cart is empty
  const isCartEmpty = useCallback(() => {
    return cart.length === 0;
  }, [cart]);
  
  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartCount,
    getCartTotal,
    isCartEmpty
  };
  
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}; 