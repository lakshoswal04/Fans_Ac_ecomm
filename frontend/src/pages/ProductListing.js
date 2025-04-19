import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaStar, FaShoppingCart, FaFilter, FaTimes, FaTruck, FaHeadset, FaCreditCard, FaLock } from 'react-icons/fa';
import { useCart } from '../contexts/CartContext';
import { useToast } from '../contexts/ToastContext';

const ProductListing = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    priceRange: '',
    color: '',
    size: '',
  });
  const [showFilters, setShowFilters] = useState(false);
  
  // Check if user is logged in
  const isAuthenticated = () => {
    return localStorage.getItem('user') !== null;
  };
  
  // Load products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // In a real application, this would be an API call
        // For now, we'll use dummy data
        const dummyProducts = [
          {
            id: 1,
            name: 'Premium Ceiling Fan',
            image: 'https://images.unsplash.com/photo-1586106532668-f4977e9518b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            price: 129.99,
            rating: 4.8,
            category: 'Fans',
            colors: ['Gold', 'Black', 'Brown'],
            sizes: ['Small', 'Medium', 'Large'],
            description: 'High-quality ceiling fan with remote control and LED light.'
          },
          {
            id: 2,
            name: 'Inverter Split AC',
            image: 'https://store.in.panasonic.com/media/catalog/product/cache/9a84ee25d3ca771c46bb524db1ba412d/c/s/cscu-hu18akyf_info_1_2406_1.webp',
            price: 549.99,
            rating: 4.9,
            category: 'Air Conditioners',
            colors: ['White'],
            sizes: ['1 Ton', '1.5 Ton', '2 Ton'],
            description: 'Energy-efficient inverter split AC with cooling and heating functions.'
          },
          {
            id: 3,
            name: 'Tower Fan',
            image: 'https://m.media-amazon.com/images/I/21kre8RuekL._SR290,290_.jpg',
            price: 89.99,
            rating: 4.5,
            category: 'Fans',
            colors: ['White', 'Black'],
            sizes: ['Standard'],
            description: 'Sleek tower fan with multiple speed settings and oscillation function.'
          },
          {
            id: 4,
            name: 'Smart Window AC',
            image: 'https://cielowigle.com/wp-content/uploads/2022/04/Window-AC.jpg',
            price: 399.99,
            rating: 4.7,
            category: 'Air Conditioners',
            colors: ['White'],
            sizes: ['0.75 Ton', '1 Ton', '1.5 Ton'],
            description: 'Smart window AC with WiFi connectivity and voice control.'
          },
          {
            id: 5,
            name: 'Decorative Ceiling Fan',
            image: 'https://www.istockphoto.com/photos/ceiling-fan',
            price: 149.99,
            rating: 4.6,
            category: 'Fans',
            colors: ['White', 'Bronze', 'Brown'],
            sizes: ['Medium', 'Large'],
            description: 'Elegant decorative ceiling fan with wooden blades and light fixture.'
          },
          {
            id: 6,
            name: 'Portable AC',
            image: 'https://images.meesho.com/images/products/420361357/smrqt_512.webp',
            price: 329.99,
            rating: 4.3,
            category: 'Air Conditioners',
            colors: ['Black', 'Green'],
            sizes: ['Small', 'Medium'],
            description: 'Compact portable AC unit ideal for small spaces and apartments.'
          },
          {
            id: 7,
            name: 'Table Fan',
            image: 'https://shop.bajajelectricals.com/cdn/shop/files/252061NEOSPECTRUMTABLE1.832.jpg?v=1727079035',
            price: 49.99,
            rating: 4.4,
            category: 'Fans',
            colors: ['White', 'Black', 'Blue'],
            sizes: ['Small', 'Medium'],
            description: 'Compact table fan with adjustable height and tilt function.'
          },
          {
            id: 8,
            name: 'Industrial Fan',
            image: 'https://mobileimages.lowes.com/productimages/696f2c1f-8c4f-4b45-9000-2b45ef366a1f/63180555.jpg?size=pdhism',
            price: 79.99,
            rating: 4.7,
            category: 'Fans',
            colors: ['Black', 'Silver'],
            sizes: ['Large', 'Extra Large'],
            description: 'Heavy-duty industrial fan for workshops, garages, and large spaces.'
          },
        ];
        
        setProducts(dummyProducts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);
  
  // Check URL for category parameter on mount and URL changes
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const categoryParam = queryParams.get('category');
    
    if (categoryParam) {
      setFilters(prev => ({
        ...prev,
        category: categoryParam
      }));
    } else if (location.search === '') {
      // Reset category if URL is cleared
      setFilters(prev => ({
        ...prev,
        category: ''
      }));
    }
  }, [location.search]);
  
  // Apply filters whenever filters or products change
  useEffect(() => {
    if (products.length === 0) return;
    
    let result = [...products];
    
    // Apply category filter
    if (filters.category) {
      // Only two main categories: Fans and Air Conditioners
      result = result.filter(product => product.category === filters.category);
    }
    
    // Apply price range filter
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      result = result.filter(product => product.price >= min && (max ? product.price <= max : true));
    }
    
    // Apply color filter
    if (filters.color) {
      result = result.filter(product => product.colors.includes(filters.color));
    }
    
    // Apply size filter
    if (filters.size) {
      result = result.filter(product => product.sizes.includes(filters.size));
    }
    
    console.log('Filters applied:', filters);
    console.log('Filtered products:', result);
    
    setFilteredProducts(result);
  }, [filters, products]);
  
  const handleFilterChange = (filterName, value) => {
    console.log(`Setting ${filterName} to ${value}`);
    
    if (filterName === 'category') {
      // Update URL with category
      if (value) {
        navigate(`?category=${encodeURIComponent(value)}`);
      } else {
        navigate('');
      }
    }
    
    // Update filter state
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };
  
  const clearFilters = () => {
    setFilters({
      category: '',
      priceRange: '',
      color: '',
      size: '',
    });
    
    // Clear URL parameters
    navigate('');
  };
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  
  // Get unique categories, colors, and sizes for filter options
  const getUniqueCategories = () => {
    // Only return our two main categories regardless of what's in the data
    return ['Fans', 'Air Conditioners'];
  };
  
  const categories = getUniqueCategories();
  const colors = [...new Set(products.flatMap(product => product.colors))];
  const sizes = [...new Set(products.flatMap(product => product.sizes))];
  
  // Function to filter products directly by category (used by category links)
  const filterByCategory = (category) => {
    setFilters(prev => ({
      ...prev, 
      category
    }));
    navigate(`?category=${encodeURIComponent(category)}`);
  };
  
  // Handle adding a product to the cart
  const handleAddToCart = (product, e) => {
    e.preventDefault(); // Prevent navigation if clicked on a link
    e.stopPropagation(); // Prevent event bubbling
    
    // Check if user is logged in
    if (!isAuthenticated()) {
      showToast('Please login to add items to your cart', 'error');
      // Navigate to login with redirect back to current page
      navigate('/login', { state: { from: window.location.pathname + location.search } });
      return;
    }
    
    addToCart(product);
    
    // Show toast notification
    showToast(`${product.name} added to cart!`, 'cart');
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        {filters.category ? filters.category : 'All Products'}
      </h1>
      
      {/* Category Quick Links */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button 
          onClick={() => clearFilters()}
          className={`px-4 py-2 rounded-md ${!filters.category ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
        >
          All Products
        </button>
        {categories.map(category => (
          <button
            key={category}
            onClick={() => filterByCategory(category)}
            className={`px-4 py-2 rounded-md ${filters.category === category ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
          >
            {category}
          </button>
        ))}
      </div>
      
      <div className="lg:hidden mb-4">
        <button
          onClick={toggleFilters}
          className="flex items-center bg-primary text-white px-4 py-2 rounded-md"
        >
          {showFilters ? <FaTimes className="mr-2" /> : <FaFilter className="mr-2" />}
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters - Mobile */}
        {showFilters && (
          <div className="lg:hidden bg-white p-4 rounded-md shadow-md mb-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Filters</h2>
              <button
                onClick={clearFilters}
                className="text-primary hover:text-primary-dark text-sm font-medium"
              >
                Clear All
              </button>
            </div>
            
            {/* Categories */}
            <div className="mb-4">
              <h3 className="font-medium mb-2">Categories</h3>
              <select
                value={filters.category}
                onChange={(e) => {
                  const category = e.target.value;
                  if (category) {
                    filterByCategory(category);
                  } else {
                    clearFilters();
                  }
                }}
                className="w-full border rounded-md p-2"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Price Range */}
            <div className="mb-4">
              <h3 className="font-medium mb-2">Price Range</h3>
              <select
                value={filters.priceRange}
                onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                className="w-full border rounded-md p-2"
              >
                <option value="">All Prices</option>
                <option value="0-100">$0 - $100</option>
                <option value="100-300">$100 - $300</option>
                <option value="300-500">$300 - $500</option>
                <option value="500-1000">$500+</option>
              </select>
            </div>
            
            {/* Colors */}
            <div className="mb-4">
              <h3 className="font-medium mb-2">Colors</h3>
              <select
                value={filters.color}
                onChange={(e) => handleFilterChange('color', e.target.value)}
                className="w-full border rounded-md p-2"
              >
                <option value="">All Colors</option>
                {colors.map((color) => (
                  <option key={color} value={color}>
                    {color}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Sizes */}
            <div>
              <h3 className="font-medium mb-2">Sizes</h3>
              <select
                value={filters.size}
                onChange={(e) => handleFilterChange('size', e.target.value)}
                className="w-full border rounded-md p-2"
              >
                <option value="">All Sizes</option>
                {sizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
        
        {/* Filters - Desktop */}
        <div className="hidden lg:block w-64 bg-white p-4 rounded-md shadow-md h-fit sticky top-20">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Filters</h2>
            <button
              onClick={clearFilters}
              className="text-primary hover:text-primary-dark text-sm font-medium"
            >
              Clear All
            </button>
          </div>
          
          {/* Categories */}
          <div className="mb-6">
            <h3 className="font-medium mb-2">Categories</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="cat-all"
                  name="category"
                  checked={filters.category === ''}
                  onChange={() => clearFilters()}
                  className="mr-2"
                />
                <label htmlFor="cat-all">All Categories</label>
              </div>
              {categories.map((category) => (
                <div key={category} className="flex items-center">
                  <input
                    type="radio"
                    id={`cat-${category}`}
                    name="category"
                    checked={filters.category === category}
                    onChange={() => filterByCategory(category)}
                    className="mr-2"
                  />
                  <label htmlFor={`cat-${category}`}>{category}</label>
                </div>
              ))}
            </div>
          </div>
          
          {/* Price Range */}
          <div className="mb-6">
            <h3 className="font-medium mb-2">Price Range</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="price-all"
                  name="priceRange"
                  checked={filters.priceRange === ''}
                  onChange={() => handleFilterChange('priceRange', '')}
                  className="mr-2"
                />
                <label htmlFor="price-all">All Prices</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="price-0-100"
                  name="priceRange"
                  checked={filters.priceRange === '0-100'}
                  onChange={() => handleFilterChange('priceRange', '0-100')}
                  className="mr-2"
                />
                <label htmlFor="price-0-100">$0 - $100</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="price-100-300"
                  name="priceRange"
                  checked={filters.priceRange === '100-300'}
                  onChange={() => handleFilterChange('priceRange', '100-300')}
                  className="mr-2"
                />
                <label htmlFor="price-100-300">$100 - $300</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="price-300-500"
                  name="priceRange"
                  checked={filters.priceRange === '300-500'}
                  onChange={() => handleFilterChange('priceRange', '300-500')}
                  className="mr-2"
                />
                <label htmlFor="price-300-500">$300 - $500</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="price-500+"
                  name="priceRange"
                  checked={filters.priceRange === '500-1000'}
                  onChange={() => handleFilterChange('priceRange', '500-1000')}
                  className="mr-2"
                />
                <label htmlFor="price-500+">$500+</label>
              </div>
            </div>
          </div>
          
          {/* Colors */}
          <div className="mb-6">
            <h3 className="font-medium mb-2">Colors</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="color-all"
                  name="color"
                  checked={filters.color === ''}
                  onChange={() => handleFilterChange('color', '')}
                  className="mr-2"
                />
                <label htmlFor="color-all">All Colors</label>
              </div>
              {colors.map((color) => (
                <div key={color} className="flex items-center">
                  <input
                    type="radio"
                    id={`color-${color}`}
                    name="color"
                    checked={filters.color === color}
                    onChange={() => handleFilterChange('color', color)}
                    className="mr-2"
                  />
                  <label htmlFor={`color-${color}`} className="flex items-center">
                    <span
                      className="w-4 h-4 rounded-full mr-2"
                      style={{
                        backgroundColor: color.toLowerCase(),
                        border: color.toLowerCase() === 'white' ? '1px solid #ddd' : 'none'
                      }}
                    ></span>
                    {color}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          {/* Sizes */}
          <div>
            <h3 className="font-medium mb-2">Sizes</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="size-all"
                  name="size"
                  checked={filters.size === ''}
                  onChange={() => handleFilterChange('size', '')}
                  className="mr-2"
                />
                <label htmlFor="size-all">All Sizes</label>
              </div>
              {sizes.map((size) => (
                <div key={size} className="flex items-center">
                  <input
                    type="radio"
                    id={`size-${size}`}
                    name="size"
                    checked={filters.size === size}
                    onChange={() => handleFilterChange('size', size)}
                    className="mr-2"
                  />
                  <label htmlFor={`size-${size}`}>{size}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Products Grid */}
        <div className="flex-1">
          {/* Active Filters */}
          {(filters.category || filters.priceRange || filters.color || filters.size) && (
            <div className="bg-gray-50 p-3 rounded-md mb-4 flex flex-wrap items-center gap-2">
              <span className="text-gray-700 font-medium">Active Filters:</span>
              
              {filters.category && (
                <div className="bg-white px-3 py-1 rounded-full text-sm flex items-center gap-1 border">
                  <span>{filters.category}</span>
                  <button
                    onClick={() => handleFilterChange('category', '')}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <FaTimes size={12} />
                  </button>
                </div>
              )}
              
              {filters.priceRange && (
                <div className="bg-white px-3 py-1 rounded-full text-sm flex items-center gap-1 border">
                  <span>
                    {filters.priceRange === '500-1000'
                      ? '$500+'
                      : `$${filters.priceRange.replace('-', ' - $')}`}
                  </span>
                  <button
                    onClick={() => handleFilterChange('priceRange', '')}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <FaTimes size={12} />
                  </button>
                </div>
              )}
              
              {filters.color && (
                <div className="bg-white px-3 py-1 rounded-full text-sm flex items-center gap-1 border">
                  <span
                    className="w-3 h-3 rounded-full mr-1"
                    style={{
                      backgroundColor: filters.color.toLowerCase(),
                      border: filters.color.toLowerCase() === 'white' ? '1px solid #ddd' : 'none'
                    }}
                  ></span>
                  <span>{filters.color}</span>
                  <button
                    onClick={() => handleFilterChange('color', '')}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <FaTimes size={12} />
                  </button>
                </div>
              )}
              
              {filters.size && (
                <div className="bg-white px-3 py-1 rounded-full text-sm flex items-center gap-1 border">
                  <span>{filters.size}</span>
                  <button
                    onClick={() => handleFilterChange('size', '')}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <FaTimes size={12} />
                  </button>
                </div>
              )}
              
              <button
                onClick={clearFilters}
                className="text-primary hover:text-primary-dark text-sm ml-auto"
              >
                Clear All
              </button>
            </div>
          )}

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="bg-white p-8 rounded-md shadow-md text-center">
              <h3 className="text-xl font-semibold mb-2">No Products Found</h3>
              <p className="text-gray-600 mb-4">
                We couldn't find any products matching your filters.
              </p>
              <button
                onClick={clearFilters}
                className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-xl overflow-hidden shadow-custom hover:shadow-hover transition duration-300 border border-gray-100 group">
                  <Link to={`/product/${product.id}`} className="block relative overflow-hidden h-60">
                    <div className="absolute top-3 left-3 z-10">
                      {product.rating >= 4.8 && (
                        <span className="bg-accent text-white text-xs font-bold uppercase px-2 py-1 rounded-lg">
                          Top Rated
                        </span>
                      )}
                    </div>
                      <img
                        src={product.image}
                        alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Link>
                  <div className="p-5">
                    <div className="text-sm text-gray-500 mb-1">
                      <button
                        onClick={(e) => filterByCategory(product.category)}
                        className="hover:text-primary hover:underline cursor-pointer"
                      >
                        {product.category}
                      </button>
                    </div>
                    <Link to={`/product/${product.id}`}>
                      <h3 className="font-semibold text-lg mb-2 text-gray-800 hover:text-primary transition line-clamp-1">{product.name}</h3>
                    </Link>
                    <div className="flex justify-between items-center mb-3">
                      <div>
                        <div className="font-bold text-xl text-primary">${product.price}</div>
                        <div className="flex items-center mt-1">
                          <div className="flex text-yellow-400 mr-1">
                            {[...Array(5)].map((_, i) => (
                              <FaStar key={i} size={14} className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'} />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500">{product.rating}</span>
                        </div>
                      </div>
                      <button 
                        className="bg-primary hover:bg-primary-dark text-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:shadow-lg transform transition-all duration-300 hover:scale-105"
                        onClick={(e) => handleAddToCart(product, e)}
                      >
                        <FaShoppingCart size={16} />
                      </button>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-2">
                      {product.colors.slice(0, 3).map((color, index) => (
                        <span
                          key={index}
                          className="w-5 h-5 rounded-full inline-block border border-gray-200"
                          style={{ backgroundColor: color.toLowerCase() }}
                          title={color}
                        ></span>
                      ))}
                      {product.colors.length > 3 && (
                        <span className="w-5 h-5 rounded-full inline-flex items-center justify-center bg-gray-100 text-xs">
                          +{product.colors.length - 3}
                        </span>
                      )}
                    </div>
                    
                    <p className="text-gray-500 text-sm line-clamp-2 mt-2">{product.description}</p>
                    <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                      <div className="flex flex-wrap gap-1">
                        {product.sizes.slice(0, 2).map((size, index) => (
                          <span key={index} className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                            {size}
                          </span>
                        ))}
                        {product.sizes.length > 2 && (
                          <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                            +{product.sizes.length - 2}
                          </span>
                        )}
                      </div>
                      <Link to={`/product/${product.id}`} className="text-primary text-sm font-medium hover:underline flex items-center">
                        Details <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductListing; 