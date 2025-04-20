import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowRight, FaStar, FaShoppingCart, FaTruck } from 'react-icons/fa';
import { useCart } from '../contexts/CartContext';
import { useToast } from '../contexts/ToastContext';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categoryCounts, setCategoryCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();

  // Check if user is logged in
  const isAuthenticated = () => {
    return localStorage.getItem('user') !== null;
  };

  // Fetch products and calculate category counts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // In a real application, this would be an API call
        // For now, we'll use dummy data (same as in ProductListing.js)
        const dummyProducts = [
    {
      id: 1,
      name: 'Premium Ceiling Fan',
      image: 'https://imgs.search.brave.com/hHyvBOsh_msIAdfKXhsvKksKhWPw38KRNfPUD_J4knc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NjFScmVkN3VTZ0wu/anBn', // Gold model as default
      price: 129.99,
      rating: 4.8,
      category: 'Ceiling Fans',
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
            category: 'Split ACs',
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
            category: 'Window ACs',
            colors: ['White'],
            sizes: ['0.75 Ton', '1 Ton', '1.5 Ton'],
            description: 'Smart window AC with WiFi connectivity and voice control.'
          },
          {
            id: 5,
            name: 'Decorative Ceiling Fan',
            image: 'https://www.istockphoto.com/photos/ceiling-fan',
            price: 179.99,
            rating: 4.6,
            category: 'Ceiling Fans',
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
            category: 'Portable ACs',
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
            category: 'Table Fans',
            colors: ['White', 'Black', 'Blue'],
            sizes: ['Small', 'Medium'],
            description: 'Compact table fan with adjustable height and tilt function.'
          },
          {
            id: 8,
            name: 'Industrial Fan',
            image: 'https://mobileimages.lowes.com/productimages/696f2c1f-8c4f-4b45-9000-2b45ef366a1f/63180555.jpg?size=pdhism',
            price: 159.99,
            rating: 4.7,
            category: 'Industrial Fans',
            colors: ['Black', 'Silver'],
            sizes: ['Large', 'Extra Large'],
            description: 'Heavy-duty industrial fan for workshops, garages, and large spaces.'
          },
        ];
        
        setProducts(dummyProducts);
        
        // Calculate category counts
        const counts = {};
        dummyProducts.forEach(product => {
          // Map specific categories to main categories
          let category = product.category;
          
          // Group all AC types into "Air Conditioners"
          if (category === 'Split ACs' || category === 'Window ACs' || category === 'Portable ACs') {
            category = 'Air Conditioners';
          }
          // Group all Fan types into "Fans"
          else if (category === 'Ceiling Fans' || category === 'Table Fans' || 
                  category === 'Industrial Fans' || category === 'Tower Fan') {
            category = 'Fans';
          }
          
          if (counts[category]) {
            counts[category]++;
          } else {
            counts[category] = 1;
          }
        });
        
        setCategoryCounts(counts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);

  // Featured products - get first 4 from the products state
  const featuredProducts = products.slice(0, 4);

  // Categories with images
  const categoryData = [
    { name: 'Fans', image: 'https://m.media-amazon.com/images/I/71MzcZp5NVL.jpg' },
    { name: 'Air Conditioners', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN4PRfvVD9_jeFzN_GMR9ubYtPDZudsifz8g&s'},
  ];

  // Helper function to get the main category for a product
  const getMainCategory = (category) => {
    if (category === 'Split ACs' || category === 'Window ACs' || category === 'Portable ACs') {
      return encodeURIComponent('Air Conditioners');
    } else if (category === 'Ceiling Fans' || category === 'Table Fans' || 
               category === 'Industrial Fans' || category === 'Tower Fan') {
      return encodeURIComponent('Fans');
    }
    return encodeURIComponent(category);
  };
  
  // Helper function to get the display name for a category
  const getDisplayCategory = (category) => {
    if (category === 'Split ACs' || category === 'Window ACs' || category === 'Portable ACs') {
      return 'Air Conditioners';
    } else if (category === 'Ceiling Fans' || category === 'Table Fans' || 
               category === 'Industrial Fans' || category === 'Tower Fan') {
      return 'Fans';
    }
    return category;
  };

  // Handle adding a product to the cart
  const handleAddToCart = (product, e) => {
    e.preventDefault(); // Prevent navigation if clicked on a link
    e.stopPropagation(); // Prevent event bubbling
    
    // Check if user is logged in
    if (!isAuthenticated()) {
      showToast('Please login to add items to your cart', 'error');
      // Navigate to login with redirect back to current page
      navigate('/login', { state: { from: window.location.pathname } });
      return;
    }
    
    addToCart(product);
    
    // Show toast notification
    showToast(`${product.name} added to cart!`, 'cart');
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark to-secondary opacity-90 z-10"></div>
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1556020685-ae41abfc9365?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80" 
            alt="Background" 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Animated wave shapes */}
        <div className="absolute bottom-0 left-0 right-0 h-16 z-20">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="absolute bottom-0 text-white">
            <path fill="currentColor" fillOpacity="1" d="M0,256L48,261.3C96,267,192,277,288,277.3C384,277,480,267,576,245.3C672,224,768,192,864,181.3C960,171,1056,181,1152,197.3C1248,213,1344,235,1392,245.3L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
        
        <div className="container mx-auto px-4 relative z-20 py-28">
          <div className="max-w-3xl">
            <div className="bg-white/10 text-white px-4 py-2 rounded-full inline-block mb-6 backdrop-blur">
              <span className="font-medium">Summer Sale! Up to 35% Off</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight">
              Stay Cool with Premium <br />
              <span className="text-primary-light">Cooling Solutions</span>
            </h1>
            <p className="text-xl mb-8 text-white/90 max-w-2xl">
              Discover our wide range of energy-efficient fans and air conditioners,
              perfect for every space and budget. Experience comfort like never before.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/products"
                className="bg-white text-primary hover:bg-primary-light hover:text-white px-8 py-4 rounded-xl font-semibold transition-all shadow-lg flex items-center group"
              >
                Shop Now 
                <span className="ml-2 transform transition-transform group-hover:translate-x-1">
                  <FaArrowRight />
                </span>
              </Link>
              <a
                href="#featured"
                className="bg-white/10 backdrop-blur border-2 border-white/30 hover:bg-white hover:text-primary text-white px-8 py-4 rounded-xl font-semibold transition-all"
              >
                Featured Products
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">Shop by Category</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Find the perfect cooling solution for your home or office space</p>
            <div className="w-24 h-1 bg-primary mx-auto mt-6 rounded-full"></div>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {categoryData.map((category, index) => (
                <Link to={`/products?category=${encodeURIComponent(category.name)}`} key={index} className="group relative block rounded-2xl overflow-hidden shadow-custom hover:shadow-hover transition duration-300">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10 z-10"></div>
                  <div className="absolute inset-0 bg-primary/70 opacity-0 group-hover:opacity-40 transition-opacity duration-300 z-10"></div>
                    <img
                      src={category.image}
                      alt={category.name}
                    className="w-full h-80 object-cover transform group-hover:scale-110 transition duration-700"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                    <h3 className="font-bold text-3xl text-white group-hover:text-primary-light group-hover:-translate-y-2 transition-all duration-300">{category.name}</h3>
                    <p className="text-white/90 mt-2 max-w-xs group-hover:-translate-y-2 transition-all duration-300 delay-100">
                      {loading ? "Loading..." : <>{categoryCounts[category.name] || 0} Products</>}
                    </p>
                    <div className="flex items-center mt-4 opacity-0 group-hover:opacity-100 group-hover:-translate-y-2 transition-all duration-300 delay-200">
                      <span className="text-white font-medium">Browse Collection</span>
                      <div className="ml-2 bg-white text-primary p-2 rounded-full transform group-hover:translate-x-1 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                  </div>
                  </div>
                </div>
              </Link>
            ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="featured" className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Featured Products</h2>
              <p className="text-gray-600 max-w-2xl">Discover our top-rated and most popular cooling solutions</p>
            </div>
            <Link to="/products" className="mt-4 md:mt-0 inline-flex items-center text-primary hover:text-primary-dark font-medium">
              View All Products
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <div key={product.id} className="bg-white rounded-xl overflow-hidden shadow-custom hover:shadow-hover transition duration-300 border border-gray-100 group">
                <Link to={`/product/${product.id}`} className="block relative overflow-hidden h-56">
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
                  <div className="text-sm text-gray-500 mb-1">{product.category}</div>
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-semibold text-lg mb-2 text-gray-800 hover:text-primary transition">{product.name}</h3>
                  </Link>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-bold text-xl text-primary">${product.price}</div>
                      <div className="flex items-center mt-1">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <FaStar key={i} size={14} className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'} />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500 ml-1">{product.rating}</span>
                      </div>
                    </div>
                    
                    <button 
                      className="bg-primary hover:bg-primary-dark text-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:shadow-lg transform transition-all duration-300 hover:scale-105"
                      onClick={(e) => handleAddToCart(product, e)}
                      aria-label={`Add ${product.name} to cart`}
                    >
                      <FaShoppingCart size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-12 bg-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl font-bold mb-2">Stay Cool & Updated</h2>
            <p className="mb-6">Subscribe to our newsletter for exclusive deals and cooling tips</p>
            <form className="flex flex-col sm:flex-row gap-2 justify-center">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-white text-gray-800 flex-grow max-w-md"
              />
              <button
                type="submit"
                className="bg-white text-primary hover:bg-blue-50 px-6 py-3 rounded-md font-semibold transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 