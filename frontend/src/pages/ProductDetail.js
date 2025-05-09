import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaStar, FaShoppingCart, FaTruck, FaShieldAlt, FaUndo, FaCheck, FaArrowLeft } from 'react-icons/fa';
import { useCart } from '../contexts/CartContext';
import { useToast } from '../contexts/ToastContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  
  const isAuthenticated = () => {
    return localStorage.getItem('user') !== null;
  };
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setSelectedColor('');
        setSelectedSize('');
        setQuantity(1);
        setLoading(true);
        
        const productsData = [
          {
            id: 1,
            name: 'Premium Ceiling Fan',
            images: [
              'https://imgs.search.brave.com/hHyvBOsh_msIAdfKXhsvKksKhWPw38KRNfPUD_J4knc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NjFScmVkN3VTZ0wu/anBn',
            ],
            price: 129.99,
            rating: 4.8,
            reviewCount: 2,
            category: 'Ceiling Fans',
            colors: ['Gold', 'Black', 'Brown'],
            colorImages: {
              'Gold': 'https://imgs.search.brave.com/hHyvBOsh_msIAdfKXhsvKksKhWPw38KRNfPUD_J4knc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NjFScmVkN3VTZ0wu/anBn',
              'Black': 'https://imgs.search.brave.com/2JbFvs8fdZvBS-vZrx6926Fk4UdrV8EdXODUpabA_qo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NDFQNEo2ZVRtUkwu/anBn',
              'Brown': 'https://imgs.search.brave.com/z6Kle_B1r-eoPE0sZxZYflap7N5LZHg9sDM7Et4A67U/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hbWJy/b2NpYS5jb20vaW1h/Z2UvY2FjaGUvY2F0/YWxvZy9wcm9kdWN0/cy81MDYvaW5zaWdo/dC1nMS02MDB4NjAw/LmpwZw'
            },
            sizes: ['Small', 'Medium', 'Large'],
            description: 'Our Premium Ceiling Fan combines elegant design with powerful performance. With its energy-efficient motor and remote control operation, it provides exceptional airflow while reducing your energy costs. The fan includes LED lighting with adjustable brightness, making it a perfect addition to any room in your home.',
            features: [
              'Energy-efficient DC motor',
              'Remote control included',
              'Adjustable LED lighting',
              '3 speed settings',
              'Reversible motor for summer and winter use',
              'Ultra-quiet operation',
            ],
            specifications: {
              'Blade Span': '52 inches',
              'Motor Type': 'DC Motor',
              'Number of Blades': '4',
              'Speeds': '3',
              'Lighting': 'Dimmable LED',
              'Power': '35W',
              'Airflow': '5200 CFM',
              'Warranty': '5 years',
            },
            stockCount: 15,
            reviews: [
              {
                id: 101,
                userName: 'James Wilson',
                rating: 5,
                date: '2023-08-15',
                title: 'Excellent quality and performance',
                comment: 'I am extremely satisfied with this ceiling fan. The gold finish is stunning and exactly as pictured. Installation was straightforward, and the remote control works perfectly. It provides excellent airflow even on the lowest setting and is remarkably quiet. Highly recommend!',
                isVerified: true
              },
              {
                id: 102,
                userName: 'Sarah Miller',
                rating: 4,
                date: '2023-09-22',
                title: 'Beautiful design, works great',
                comment: 'This fan looks fantastic in our living room. The LED light is bright enough and has nice dimming options. I only wish the remote had more features, but overall very happy with the purchase.',
                isVerified: true
              }
            ],
          },
          {
            id: 2,
            name: 'Inverter Split AC',
            images: [
              'https://store.in.panasonic.com/media/catalog/product/cache/9a84ee25d3ca771c46bb524db1ba412d/c/s/cscu-hu18akyf_info_1_2406_1.webp',
            ],
            price: 549.99,
            rating: 4.9,
            reviewCount: 2,
            reviews: [
              {
                id: 201,
                userName: 'Robert Johnson',
                rating: 5,
                date: '2023-10-05',
                title: 'Best AC I have ever purchased',
                comment: 'This inverter AC has exceeded my expectations. It cools the room rapidly and maintains a consistent temperature. The energy efficiency is remarkable - my electricity bill has noticeably decreased. The sleep mode is perfect for nighttime use and the wifi connectivity makes it easy to control from anywhere.',
                isVerified: true
              },
              {
                id: 202,
                userName: 'Emily Chen',
                rating: 5,
                date: '2023-09-18',
                title: 'Whisper quiet and efficient',
                comment: 'I was surprised by how quiet this AC is even on the highest setting. The installation was professional and quick. The air quality has improved significantly, and the smart features work perfectly with my home automation system. Definitely worth the investment.',
                isVerified: true
              }
            ],
            category: 'Air Conditioners',
            colors: ['White'],
            colorImages: {
              'White': 'https://store.in.panasonic.com/media/catalog/product/cache/9a84ee25d3ca771c46bb524db1ba412d/c/s/cscu-hu18akyf_info_1_2406_1.webp'
            },
            sizes: ['1 Ton', '1.5 Ton', '2 Ton'],
            description: 'The Inverter Split AC offers superior cooling with maximum energy efficiency. Its advanced inverter technology adjusts compressor speed based on cooling requirements, resulting in consistent temperature and lower electricity bills. The AC features a sleep mode, auto restart, and effective air filtration.',
            features: [
              'Inverter technology',
              'High energy efficiency rating',
              'Smart connectivity',
              'Anti-bacterial filter',
              'Auto cleaning function',
              'Sleep mode',
            ],
            specifications: {
              'Capacity': '1.5 Ton',
              'Type': 'Split AC',
              'Energy Rating': '5 Star',
              'Annual Power Consumption': '840 kWh',
              'Noise Level': '26 dB',
              'Refrigerant': 'R32',
              'Special Features': 'Wifi Control, Voice Control',
              'Warranty': '10 years on compressor',
            },
            stockCount: 8,
          },
          {
            id: 3,
            name: 'Tower Fan',
            images: [
              'https://m.media-amazon.com/images/I/21kre8RuekL._SR290,290_.jpg',
            ],
            price: 89.99,
            rating: 4.5,
            reviewCount: 2,
            reviews: [
              {
                id: 301,
                userName: 'Michael Adams',
                rating: 4,
                date: '2023-07-12',
                title: 'Great value for the price',
                comment: "This tower fan is perfect for my apartment. It is slim and takes up minimal space but provides excellent airflow. The remote control is convenient, and I appreciate the various speed settings. The oscillation covers a wide area. It is not the quietest on the highest setting, but overall I am very satisfied.",
                isVerified: true
              },
              {
                id: 302,
                userName: 'Jessica Lee',
                rating: 5,
                date: '2023-08-03',
                title: 'Sleek design, powerful airflow',
                comment: 'I love the modern look of this tower fan - it blends perfectly with my decor. Assembly was straightforward and took less than 10 minutes. The timer function is handy for nighttime use, and it is quiet enough not to disturb sleep. The black color option looks much better in person than in the photos.',
                isVerified: true
              }
            ],
            category: 'Fans',
            colors: ['White', 'Black'],
            colorImages: {
              'White': 'https://m.media-amazon.com/images/I/21kre8RuekL._SR290,290_.jpg',
              'Black': 'https://cdn.rona.ca/images/41537597_L.jpg'
            },
            sizes: ['Standard'],
            description: 'This sleek tower fan delivers powerful airflow in a space-saving design. With multiple speed settings, oscillation function, and a programmable timer, it provides customized cooling for any room. The whisper-quiet operation makes it perfect for bedrooms and offices.',
            features: [
              'Slim tower design',
              '3 speed settings',
              'Wide oscillation coverage',
              'Programmable timer',
              'Remote control',
              'Quiet operation',
            ],
            specifications: {
              'Height': '42 inches',
              'Fan Type': 'Tower',
              'Speeds': '3',
              'Timer': 'Up to 8 hours',
              'Noise Level': '45 dB',
              'Power Consumption': '45W',
              'Oscillation': '80 degrees',
              'Warranty': '2 years',
            },
            stockCount: 20,
          },
          {
            id: 4,
            name: 'Smart Window AC',
            images: [
              'https://cielowigle.com/wp-content/uploads/2022/04/Window-AC.jpg',
            ],
            price: 399.99,
            rating: 4.7,
            reviewCount: 2,
            reviews: [
              {
                id: 401,
                userName: 'Daniel Thompson',
                rating: 5,
                date: '2023-06-28',
                title: 'Smart features work flawlessly',
                comment: 'The smart functionality of this window AC is impressive. I can control it with my phone and set schedules that align with my routine. It cools my bedroom quickly and efficiently. The installation was more straightforward than I expected, though having a second person definitely helped.',
                isVerified: true
              },
              {
                id: 402,
                userName: 'Sophia Garcia',
                rating: 4,
                date: '2023-07-14',
                title: 'Good cooling, some app issues',
                comment: 'This AC does a great job cooling my home office. The voice control integration with Alexa works well. The only downside is occasional connectivity issues with the app, but a router restart usually fixes it. Energy efficiency is good for a window unit.',
                isVerified: false
              }
            ],
            category: 'Air Conditioners',
            colors: ['White'],
            colorImages: {
              'White': 'https://cielowigle.com/wp-content/uploads/2022/04/Window-AC.jpg'
            },
            sizes: ['0.75 Ton', '1 Ton', '1.5 Ton'],
            description: 'The Smart Window AC combines powerful cooling with smart home connectivity. Control your AC from anywhere using your smartphone, set schedules, and integrate with voice assistants. Its energy-efficient operation helps reduce electricity costs while keeping your room perfectly cooled.',
            features: [
              'WiFi connectivity',
              'Voice assistant compatible',
              'Energy-saving mode',
              'Programmable scheduler',
              'Remote control included',
              'Washable filter',
            ],
            specifications: {
              'Capacity': '1 Ton',
              'Type': 'Window AC',
              'Energy Rating': '4 Star',
              'Annual Power Consumption': '780 kWh',
              'Noise Level': '52 dB',
              'Smart Features': 'App Control, Voice Control',
              'Power': '1120W',
              'Warranty': '5 years',
            },
            stockCount: 12,
          },
          {
            id: 5,
            name: 'Decorative Ceiling Fan',
            images: [
              'https://imgs.search.brave.com/vdC4n_2-mRy-PJEelBUbFYnTOhnWPc_SN1TjKZ_ycS4/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tb29v/bmkuY29tL2Nkbi9z/aG9wL3Byb2R1Y3Rz/LzFfNDE0MzRiYmIt/NjRjYy00ZTdlLTk2/MWUtMWZkNTU5ODNk/MzlhXzYwMHguanBn/P3Y9MTY0ODU2MTU5/Ng',
              'https://imgs.search.brave.com/4jfcb7uv6bJwguMv7YQUTk9n8sr9kI0wGD40rf4aItk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/d2hpdGV0ZWFrLmNv/bS9tZWRpYS9jYXRh/bG9nL3Byb2R1Y3Qv/Yy9mL2NmOS0xMDAw/NV8yNV8uanBnP29w/dGltaXplPW1lZGl1/bSZmaXQ9Ym91bmRz/JmhlaWdodD00NTAm/d2lkdGg9NDUwJmNh/bnZhcz00NTA6NDUw'
            ],
            price: 179.99,
            rating: 4.6,
            reviewCount: 2,
            reviews: [
              {
                id: 501,
                userName: 'Olivia Martinez',
                rating: 5,
                date: '2023-05-19',
                title: 'Gorgeous addition to our dining room',
                comment: 'The white decorative ceiling fan has transformed our dining area. It is not just functional but a statement piece that guests always comment on. The lighting is warm and creates a perfect ambiance for dinner parties. Installation took about an hour, but the results are well worth it.',
                isVerified: true
              },
              {
                id: 502,
                userName: 'William Brown',
                rating: 4,
                date: '2023-06-05',
                title: 'Beautiful design, decent airflow',
                comment: 'I purchased the brown version for my living room with vaulted ceilings. The wood finish is rich and elegant. The airflow is good but not as powerful as some standard fans, which is the trade-off for the decorative design. Overall, I am pleased with the purchase and the quality feels substantial.',
                isVerified: true
              }
            ],
            category: 'Fans',
            colors: ['White', 'Brown'],
            colorImages: {
              'White': 'https://imgs.search.brave.com/vdC4n_2-mRy-PJEelBUbFYnTOhnWPc_SN1TjKZ_ycS4/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tb29v/bmkuY29tL2Nkbi9z/aG9wL3Byb2R1Y3Rz/LzFfNDE0MzRiYmIt/NjRjYy00ZTdlLTk2/MWUtMWZkNTU5ODNk/MzlhXzYwMHguanBn/P3Y9MTY0ODU2MTU5/Ng',
              'Brown': 'https://imgs.search.brave.com/4jfcb7uv6bJwguMv7YQUTk9n8sr9kI0wGD40rf4aItk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/d2hpdGV0ZWFrLmNv/bS9tZWRpYS9jYXRh/bG9nL3Byb2R1Y3Qv/Yy9mL2NmOS0xMDAw/NV8yNV8uanBnP29w/dGltaXplPW1lZGl1/bSZmaXQ9Ym91bmRz/JmhlaWdodD00NTAm/d2lkdGg9NDUwJmNh/bnZhcz00NTA6NDUw'
            },
            sizes: ['Medium', 'Large'],
            description: 'Enhance your home décor with our Decorative Ceiling Fan featuring elegant wooden blades and antique-style finishes. This fan combines style with functionality, providing excellent air circulation while serving as a beautiful centerpiece for any room. The included light fixture adds ambient lighting to complete the look.',
            features: [
              'Decorative design',
              'Wooden blades',
              'Integrated light fixture',
              '3 speed settings',
              'Pull chain control',
              'Reversible motor',
            ],
            specifications: {
              'Blade Span': '52 inches',
              'Motor Type': 'AC Motor',
              'Number of Blades': '5',
              'Speeds': '3',
              'Lighting': 'E27 socket',
              'Power': '65W',
              'Airflow': '5000 CFM',
              'Warranty': '3 years',
            },
            stockCount: 7,
          },
          {
            id: 6,
            name: 'Portable AC',
            images: [
              'https://images.meesho.com/images/products/420361357/smrqt_512.webp',
            ],
            price: 329.99,
            rating: 4.3,
            reviewCount: 2,
            reviews: [
              {
                id: 601,
                userName: 'Thomas Wilson',
                rating: 4,
                date: '2023-08-24',
                title: 'Effective for small rooms',
                comment: "I got the black model for my home office which is about 300 sq ft, and it cools the space effectively. The portability is convenient - I can move it to the bedroom at night. The only downside is that it is a bit louder than I expected, but the cooling performance makes up for it.",
                isVerified: true
              },
              {
                id: 602,
                userName: 'Amanda Davis',
                rating: 5,
                date: '2023-07-30',
                title: 'Green color is beautiful, works great',
                comment: 'I love the green color option - it is unique and adds character to my room. Setup was easy with the included window kit. The digital controls are intuitive, and the remote is handy. It cools my bedroom quickly, and the dehumidifier function has been excellent during humid days. Very happy with this purchase!',
                isVerified: true
              }
            ],
            category: 'Air Conditioners',
            colors: ['Black', 'Green'],
            colorImages: {
              'Black': 'https://images.meesho.com/images/products/420361357/smrqt_512.webp',
              'Green': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEPpHQZn7RcfwD_QgswHNbZd6pqJZgRvbTLoyW7tZywJsQkYqbpbMnibaJXq-yyK_jxsU&usqp=CAU'
            },
            sizes: ['Small', 'Medium'],
            description: 'The Portable AC is perfect for cooling spaces without permanent installation. It easily moves from room to room on built-in casters and requires no professional installation. With both cooling and dehumidification functions, it provides comfort in any space up to 400 sq. ft.',
            features: [
              'Portable design with casters',
              'No installation required',
              'Cooling and dehumidification',
              'Digital controls',
              'Remote control included',
              '24-hour timer',
            ],
            specifications: {
              'Cooling Capacity': '8,000 BTU',
              'Coverage Area': 'Up to 400 sq. ft.',
              'Energy Efficiency Ratio': '8.9',
              'Noise Level': '52 dB',
              'Dimensions': '17.5 x 15 x 29.5 inches',
              'Weight': '65 lbs',
              'Power': '115V/60Hz',
              'Warranty': '1 year',
            },
            stockCount: 15,
          },
          {
            id: 7,
            name: 'Table Fan',
            images: [
              'https://kitchenmart.co.in/cdn/shop/files/71jTaNjcdFL.jpg?v=1712122898'
            ],
            price: 49.99,
            rating: 4.4,
            reviewCount: 0,
            reviews: [],
            category: 'Fans',
            colors: ['White', 'Black'],
            colorImages: {
              'White': 'https://kitchenmart.co.in/cdn/shop/files/71jTaNjcdFL.jpg?v=1712122898',
              'Black': 'https://shop.bajajelectricals.com/cdn/shop/files/252061NEOSPECTRUMTABLE1.832.jpg?v=1727079035',
              
            },
            sizes: ['Small', 'Medium'],
            description: 'The Table Fan offers personal cooling with adjustable height and tilt features. Perfect for desks, bedside tables, or countertops, it provides directed airflow exactly where you need it. The compact design saves space while still delivering powerful cooling performance.',
            features: [
              'Adjustable height',
              'Tilt function',
              '3 speed settings',
              'Oscillation feature',
              'Compact design',
              'Easy assembly',
            ],
            specifications: {
              'Diameter': '12 inches',
              'Heights': 'Adjustable: 12-16 inches',
              'Speeds': '3',
              'Power': '35W',
              'Cord Length': '6 feet',
              'Weight': '3.5 lbs',
              'Material': 'Plastic',
              'Warranty': '1 year',
            },
            stockCount: 25,
          },
          {
            id: 8,
            name: 'Industrial Fan',
            images: [
              'https://mobileimages.lowes.com/productimages/696f2c1f-8c4f-4b45-9000-2b45ef366a1f/63180555.jpg?size=pdhism',
            ],
            price: 159.99,
            rating: 4.7,
            reviewCount: 0,
            reviews: [],
            category: 'Fans',
            colors: ['Black'],
            colorImages: {
              'Black': 'https://mobileimages.lowes.com/productimages/696f2c1f-8c4f-4b45-9000-2b45ef366a1f/63180555.jpg?size=pdhism',
            },
            sizes: ['Large', 'Extra Large'],
            description: 'The Industrial Fan is designed for maximum airflow in large spaces such as workshops, warehouses, and garages. Built with durability in mind, it features a heavy-duty construction that withstands tough environments. The powerful motor delivers strong air circulation even in spacious areas.',
            features: [
              'Heavy-duty construction',
              'High-velocity airflow',
              '3 speed settings',
              'Metal blades',
              'Adjustable tilt',
              'Wall-mountable option',
            ],
            specifications: {
              'Diameter': '24 inches',
              'Motor': 'Industrial Grade',
              'Speeds': '3',
              'Power': '120W',
              'Noise Level': '65 dB',
              'Airflow': '7500 CFM',
              'Construction': 'All-metal',
              'Warranty': '3 years',
            },
            stockCount: 6,
          }
        ];
        
        const foundProduct = productsData.find(p => p.id === parseInt(id));
        
        if (foundProduct) {
          setProduct(foundProduct);
          setSelectedColor(foundProduct.colors[0]);
          setSelectedSize(foundProduct.sizes[0]);
        } else {
          setProduct(null);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [id]);
  
  const handleColorChange = (color) => {
    setSelectedColor(color);
    
    if (product && product.colorImages && product.colorImages[color]) {
      const updatedProduct = {...product};
      updatedProduct.images[0] = product.colorImages[color];
      setProduct(updatedProduct);
    }
  };
  
  const handleSizeChange = (size) => {
    setSelectedSize(size);
    
    if (product) {
      let priceAdjustment = 0;
      let bladeSizeAdjustment = 0;
      let airflowAdjustment = 0;
      
      if (product.category.includes('Fan')) {
        if (size === 'Small') {
          priceAdjustment = 0;
          bladeSizeAdjustment = -10;
          airflowAdjustment = -1000;
        } else if (size === 'Medium') {
          priceAdjustment = 20;
          bladeSizeAdjustment = 0;
          airflowAdjustment = 0;
        } else if (size === 'Large') {
          priceAdjustment = 40;
          bladeSizeAdjustment = 8;
          airflowAdjustment = 1300;
        } else if (size === 'Extra Large') {
          priceAdjustment = 60;
          bladeSizeAdjustment = 12;
          airflowAdjustment = 2000;
        }
      } else if (product.category.includes('Air Conditioner')) {
        if (product.name === 'Portable AC') {
          // Handle Portable AC sizes
          if (size === 'Small') {
            priceAdjustment = 0;
          } else if (size === 'Medium') {
            priceAdjustment = 50;
          }
        } else {
          // Handle other ACs with ton sizes
          if (size === '0.75 Ton') {
            priceAdjustment = -100;
          } else if (size === '1 Ton') {
            priceAdjustment = 0;
          } else if (size === '1.5 Ton') {
            priceAdjustment = 150;
          } else if (size === '2 Ton') {
            priceAdjustment = 300;
          }
        }
      }
      
      const updatedProduct = {...product};
      
      if (product.specifications['Blade Span']) {
        const originalSize = parseInt(product.specifications['Blade Span']);
        updatedProduct.specifications['Blade Span'] = `${originalSize + bladeSizeAdjustment} inches`;
      }
      
      if (product.specifications['Airflow']) {
        const originalAirflow = parseInt(product.specifications['Airflow']);
        updatedProduct.specifications['Airflow'] = `${originalAirflow + airflowAdjustment} CFM`;
      }
      
      if (product.specifications['Capacity']) {
        updatedProduct.specifications['Capacity'] = size;
      }
      
      // For Portable AC, update the Cooling Capacity and Coverage Area based on size
      if (product.name === 'Portable AC') {
        if (size === 'Small') {
          updatedProduct.specifications['Cooling Capacity'] = '8,000 BTU';
          updatedProduct.specifications['Coverage Area'] = 'Up to 400 sq. ft.';
        } else if (size === 'Medium') {
          updatedProduct.specifications['Cooling Capacity'] = '10,000 BTU';
          updatedProduct.specifications['Coverage Area'] = 'Up to 550 sq. ft.';
        }
      }
      
      updatedProduct.price = product.price;
      
      if (size !== product.sizes[0]) {
        updatedProduct.price += priceAdjustment;
      } else {
        updatedProduct.price = product.price;
      }
      
      setProduct(updatedProduct);
    }
  };
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const increaseQuantity = () => {
    if (product && quantity < product.stockCount) {
      setQuantity(quantity + 1);
    }
  };
  
  const handleAddToCart = () => {
    if (!isAuthenticated()) {
      showToast('Please login to add items to your cart', 'error');
      navigate('/login', { state: { from: window.location.pathname } });
      return;
    }
    
    const cartProduct = {
      id: product.id,
      name: product.name,
      image: product.images[0],
      price: product.price,
      category: product.category,
      color: selectedColor,
      size: selectedSize,
      quantity: quantity
    };
    
    addToCart(cartProduct);
    showToast(`${product.name} added to cart!`, 'cart');
    setIsAddedToCart(true);
    
    setTimeout(() => {
      setIsAddedToCart(false);
    }, 3000);
  };

  const handleBuyNow = () => {
    if (!isAuthenticated()) {
      showToast('Please login to purchase items', 'error');
      navigate('/login', { state: { from: window.location.pathname } });
      return;
    }
    
    const cartProduct = {
      id: product.id,
      name: product.name,
      image: product.images[0],
      price: product.price,
      category: product.category,
      color: selectedColor,
      size: selectedSize,
      quantity: quantity
    };
    
    addToCart(cartProduct);
    navigate('/checkout');
  };
  
  // Helper function to map color names to their CSS color values
  const getColorValue = (colorName) => {
    if (!colorName) return '';
    
    const colorMap = {
      'black': '#000000',
      'white': '#ffffff',
      'brown': '#a52a2a',
      'gold': '#ffd700',
      'green': '#008000',
      // Add more color mappings as needed
    };
    
    // Do a case-insensitive lookup
    const normalizedColor = colorName.toLowerCase();
    return colorMap[normalizedColor] || normalizedColor;
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <p className="mb-8">The product you're looking for doesn't exist or has been removed.</p>
        <Link
          to="/products"
          className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-dark transition inline-flex items-center"
        >
          <FaArrowLeft className="mr-2" /> Back to Products
        </Link>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <nav className="mb-8">
        <ol className="flex items-center text-sm flex-wrap">
          <li className="flex items-center">
            <Link to="/" className="text-gray-500 hover:text-primary">Home</Link>
            <span className="mx-2 text-gray-400">/</span>
          </li>
          <li className="flex items-center">
            <Link to="/products" className="text-gray-500 hover:text-primary">Products</Link>
            <span className="mx-2 text-gray-400">/</span>
          </li>
          <li className="flex items-center">
            <Link to={`/products?category=${product.category}`} className="text-gray-500 hover:text-primary">{product.category}</Link>
            <span className="mx-2 text-gray-400">/</span>
          </li>
          <li className="text-gray-700 font-medium">{product.name}</li>
        </ol>
      </nav>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Product Images */}
        <div>
          <div className="bg-white rounded-lg overflow-hidden shadow-md mb-4">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {product.images.map((image, index) => (
              <div
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-sm cursor-pointer hover:shadow-md transition"
              >
                <img
                  src={image}
                  alt={`${product.name} - Image ${index + 1}`}
                  className="w-full h-24 object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          
          <div className="flex items-center mb-4">
            <div className="flex text-yellow-400 mr-2">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} size={18} className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'} />
              ))}
            </div>
            <span className="text-gray-700">{product.rating} ({product.reviewCount} reviews)</span>
          </div>
          
          <div className="text-2xl font-bold text-primary mb-6">${product.price}</div>
          
          <div className="mb-6">
            <p className="text-gray-700 mb-4">{product.description}</p>
            
            <div className="flex items-center">
              <div className={`rounded-full w-3 h-3 mr-2 ${product.stockCount > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className={`${product.stockCount > 0 ? 'text-green-700' : 'text-red-700'} font-medium`}>
                {product.stockCount > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
              {product.stockCount > 0 && (
                <span className="text-gray-500 ml-2">({product.stockCount} available)</span>
              )}
            </div>
          </div>
          
          {/* Color Selection */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Color: <span className="text-gray-700 font-normal">{selectedColor}</span></h3>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => handleColorChange(color)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition ${
                    selectedColor === color ? 'border-primary' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: getColorValue(color) }}
                  title={color}
                >
                  {selectedColor === color && (
                    <span className="text-black text-xs">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>
          
          {/* Size Selection */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Size: <span className="text-gray-700 font-normal">{selectedSize}</span></h3>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => handleSizeChange(size)}
                  className={`px-4 py-2 border rounded-md transition ${
                    selectedSize === size
                      ? 'border-primary bg-primary bg-opacity-10 text-primary'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          
          {/* Quantity */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Quantity:</h3>
            <div className="flex">
              <button
                onClick={decreaseQuantity}
                className="w-10 h-10 bg-gray-100 border border-gray-300 flex items-center justify-center rounded-l-md hover:bg-gray-200 transition"
                disabled={quantity <= 1}
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.min(product.stockCount, Math.max(1, parseInt(e.target.value))))}
                className="w-16 h-10 border-t border-b border-gray-300 text-center focus:outline-none"
              />
              <button
                onClick={increaseQuantity}
                className="w-10 h-10 bg-gray-100 border border-gray-300 flex items-center justify-center rounded-r-md hover:bg-gray-200 transition"
                disabled={quantity >= product.stockCount}
              >
                +
              </button>
            </div>
          </div>
          
          {/* Add to Cart Button */}
          <div className="flex flex-wrap gap-3 mb-8">
            <button
              onClick={handleAddToCart}
              disabled={product.stockCount === 0}
              className={`flex-1 py-3 px-6 rounded-md font-semibold flex items-center justify-center transition ${
                product.stockCount === 0
                  ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                  : 'bg-primary text-white hover:bg-primary-dark'
              }`}
            >
              <FaShoppingCart className="mr-2" /> Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              disabled={product.stockCount === 0}
              className={`py-3 px-6 rounded-md font-semibold transition ${
                product.stockCount === 0
                  ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                  : 'bg-secondary text-white hover:bg-secondary-dark'
              }`}
            >
              Buy Now
            </button>
          </div>
          
          {/* Added to Cart Message */}
          {isAddedToCart && (
            <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded flex items-center">
              <FaCheck className="mr-2" />
              Item added to cart successfully!
            </div>
          )}
          
          {/* Benefits */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center">
              <FaTruck className="mr-2 text-primary" />
              <span className="text-sm">Free shipping over $100</span>
            </div>
            <div className="flex items-center">
              <FaShieldAlt className="mr-2 text-primary" />
              <span className="text-sm">5-Year Warranty</span>
            </div>
            <div className="flex items-center">
              <FaUndo className="mr-2 text-primary" />
              <span className="text-sm">30-Day Easy Returns</span>
            </div>
            <div className="flex items-center">
              <FaCheck className="mr-2 text-primary" />
              <span className="text-sm">Quality Guarantee</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="mt-12">
        <div className="border-b border-gray-200">
          <nav className="flex flex-wrap -mb-px">
            <button
              onClick={() => setActiveTab('description')}
              className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'description'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab('features')}
              className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'features'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Features
            </button>
            <button
              onClick={() => setActiveTab('specifications')}
              className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'specifications'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Specifications
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'reviews'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Reviews ({product.reviewCount})
            </button>
          </nav>
        </div>

        <div className="py-6">
          {activeTab === 'description' && (
            <div className="prose max-w-none">
              <p className="mb-4">{product.description}</p>
              <p>
                Enhance your home comfort with our premium ceiling fan that combines style, efficiency, and functionality. 
                Designed to circulate air effectively in spaces of all sizes, this fan will help you stay cool during hot 
                summer days and can also be used to distribute warm air during winter.
              </p>
            </div>
          )}
          
          {activeTab === 'features' && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Key Features</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {activeTab === 'specifications' && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Technical Specifications</h3>
              <div className="border rounded-md overflow-hidden">
                {Object.entries(product.specifications).map(([key, value], index) => (
                  <div
                    key={key}
                    className={`grid grid-cols-3 p-3 ${
                      index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                    }`}
                  >
                    <div className="font-medium">{key}</div>
                    <div className="col-span-2">{value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'reviews' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Customer Reviews</h3>
                <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition">
                  Write a Review
                </button>
              </div>
              
              {product.reviews && product.reviews.length > 0 ? (
                <div className="space-y-6">
                  {product.reviews.map(review => (
                    <div key={review.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                      <div className="flex justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-lg">{review.title}</h4>
                          <div className="flex items-center mt-1">
                            <div className="flex text-yellow-400 mr-2">
                              {[...Array(5)].map((_, i) => (
                                <FaStar key={i} size={14} className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'} />
                              ))}
                            </div>
                            <span className="text-gray-600 text-sm">
                              {review.isVerified && (
                                <span className="text-green-600 font-medium mr-2">✓ Verified Purchase</span>
                              )}
                              {review.date}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                      <div className="mt-3 text-sm text-gray-500">
                        <span>Review by {review.userName}</span>
                      </div>
                    </div>
                  ))}
                  
                  {product.reviewCount > product.reviews.length && (
                    <div className="text-center py-4">
                      <button className="text-primary font-medium hover:underline">
                        Load More Reviews ({product.reviewCount - product.reviews.length} remaining)
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-4">
                    No reviews yet. Be the first to review this product!
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Related Products Section would go here */}
    </div>
  );
};

export default ProductDetail; 