const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Import models
const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');
const ApprovedEmail = require('./models/ApprovedEmail');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Delete all existing data
const clearDB = async () => {
  try {
    await ApprovedEmail.deleteMany({});
    await User.deleteMany({});
    await Product.deleteMany({});
    await Order.deleteMany({});
    console.log('All data cleared from database');
  } catch (error) {
    console.error('Error clearing database:', error);
    process.exit(1);
  }
};

// Seed approved emails
const seedApprovedEmails = async () => {
  try {
    const approvedEmails = [
      { email: 'admin@example.com', role: 'admin' },
      { email: 'customer@example.com', role: 'customer' },
      { email: 'rider1@example.com', role: 'rider' },
      { email: 'rider2@example.com', role: 'rider' }
    ];

    await ApprovedEmail.insertMany(approvedEmails);
    console.log('Sample approved emails added successfully');
  } catch (error) {
    console.error('Error seeding approved emails:', error);
    process.exit(1);
  }
};

// Seed users
const seedUsers = async () => {
  try {
    const users = [
      {
        name: 'Admin User',
        email: 'admin@example.com',
        googleId: 'mock_admin@example.com',
        role: 'admin',
        approved: true,
        address: {
          street: '123 Admin St',
          city: 'Admin City',
          state: 'AS',
          zipCode: '12345',
          country: 'USA'
        },
        phone: '1234567890'
      },
      {
        name: 'Customer User',
        email: 'customer@example.com',
        googleId: 'mock_customer@example.com',
        role: 'customer',
        approved: true,
        address: {
          street: '456 Customer St',
          city: 'Customer City',
          state: 'CS',
          zipCode: '67890',
          country: 'USA'
        },
        phone: '0987654321'
      },
      {
        name: 'Rider One',
        email: 'rider1@example.com',
        googleId: 'mock_rider1@example.com',
        role: 'rider',
        approved: true,
        phone: '1122334455'
      },
      {
        name: 'Rider Two',
        email: 'rider2@example.com',
        googleId: 'mock_rider2@example.com',
        role: 'rider',
        approved: true,
        phone: '5544332211'
      }
    ];

    await User.insertMany(users);
    console.log('Sample users added successfully');
  } catch (error) {
    console.error('Error seeding users:', error);
    process.exit(1);
  }
};

// Seed products
const seedProducts = async () => {
  try {
    const products = [
      {
        name: 'Table Fan',
        description: 'A high-quality table fan with 3 speed settings',
        category: 'fan',
        price: 29.99,
        variants: [
          {
            color: 'White',
            size: '12 inch',
            stock: 50,
            sku: 'TF-W-12'
          },
          {
            color: 'Black',
            size: '12 inch',
            stock: 30,
            sku: 'TF-B-12'
          }
        ],
        imageUrl: 'https://example.com/tablefan.jpg',
        brand: 'AirMax',
        isPopular: true,
        features: [
          '3 Speed Settings',
          'Oscillation',
          'Tilt Adjustment',
          'Quiet Operation'
        ],
        warranty: '1 year',
        ratings: 4.5,
        reviewCount: 12
      },
      {
        name: 'Ceiling Fan',
        description: 'Modern ceiling fan with remote control',
        category: 'fan',
        price: 89.99,
        variants: [
          {
            color: 'White',
            size: '52 inch',
            stock: 25,
            sku: 'CF-W-52'
          },
          {
            color: 'Brown',
            size: '52 inch',
            stock: 20,
            sku: 'CF-BR-52'
          },
          {
            color: 'Black',
            size: '52 inch',
            stock: 15,
            sku: 'CF-BL-52'
          }
        ],
        imageUrl: 'https://example.com/ceilingfan.jpg',
        brand: 'CoolBreeze',
        features: [
          'Remote Control',
          'LED Light',
          '3 Speed Settings',
          'Reversible Motor'
        ],
        warranty: '2 years',
        ratings: 5,
        reviewCount: 8
      },
      {
        name: 'Portable AC',
        description: 'Compact portable air conditioner for small rooms',
        category: 'ac',
        price: 249.99,
        variants: [
          {
            color: 'White',
            size: '8000 BTU',
            stock: 15,
            sku: 'PAC-W-8K'
          },
          {
            color: 'White',
            size: '10000 BTU',
            stock: 10,
            sku: 'PAC-W-10K'
          }
        ],
        imageUrl: 'https://example.com/portableac.jpg',
        brand: 'CoolTech',
        features: [
          'Energy Efficient',
          'Dehumidifier Function',
          'Remote Control',
          'Timer'
        ],
        warranty: '1 year',
        ratings: 4,
        reviewCount: 15
      },
      {
        name: 'Split AC',
        description: 'Energy efficient split air conditioner with inverter technology',
        category: 'ac',
        price: 499.99,
        variants: [
          {
            color: 'White',
            size: '1 Ton',
            stock: 10,
            sku: 'SAC-W-1T'
          },
          {
            color: 'White',
            size: '1.5 Ton',
            stock: 8,
            sku: 'SAC-W-1.5T'
          },
          {
            color: 'White',
            size: '2 Ton',
            stock: 5,
            sku: 'SAC-W-2T'
          }
        ],
        imageUrl: 'https://example.com/splitac.jpg',
        brand: 'CoolTech',
        isPopular: true,
        features: [
          'Inverter Technology',
          'Energy Efficient',
          'Sleep Mode',
          'Auto Restart',
          'Air Purification'
        ],
        warranty: '5 years',
        ratings: 4.8,
        reviewCount: 25
      },
      {
        name: 'Exhaust Fan',
        description: 'Powerful exhaust fan for kitchen and bathroom',
        category: 'fan',
        price: 39.99,
        variants: [
          {
            color: 'White',
            size: 'Small',
            stock: 40,
            sku: 'EF-W-S'
          },
          {
            color: 'White',
            size: 'Medium',
            stock: 30,
            sku: 'EF-W-M'
          },
          {
            color: 'White',
            size: 'Large',
            stock: 20,
            sku: 'EF-W-L'
          }
        ],
        imageUrl: 'https://example.com/exhaustfan.jpg',
        brand: 'AirMax',
        features: [
          'Powerful Motor',
          'Low Noise',
          'Easy Installation',
          'Moisture Resistant'
        ],
        warranty: '1 year',
        ratings: 4.2,
        reviewCount: 18
      }
    ];

    await Product.insertMany(products);
    console.log('Sample products added successfully');
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

// Seed orders
const seedOrders = async () => {
  try {
    // Get sample user IDs
    const customer = await User.findOne({ email: 'customer@example.com' });
    const rider = await User.findOne({ email: 'rider1@example.com' });
    
    // Get sample product IDs
    const products = await Product.find().limit(3);
    
    const orders = [
      {
        user: customer._id,
        items: [
          {
            product: products[0]._id,
            color: products[0].variants[0].color,
            size: products[0].variants[0].size,
            quantity: 2,
            price: products[0].price
          },
          {
            product: products[1]._id,
            color: products[1].variants[0].color,
            size: products[1].variants[0].size,
            quantity: 1,
            price: products[1].price
          }
        ],
        totalAmount: (products[0].price * 2) + products[1].price,
        status: 'paid',
        paymentMethod: 'credit_card',
        shippingAddress: {
          street: '456 Customer St',
          city: 'Customer City',
          state: 'CS',
          zipCode: '67890',
          country: 'USA'
        },
        phone: '0987654321'
      },
      {
        user: customer._id,
        items: [
          {
            product: products[2]._id,
            color: products[2].variants[0].color,
            size: products[2].variants[0].size,
            quantity: 1,
            price: products[2].price
          }
        ],
        totalAmount: products[2].price,
        status: 'shipped',
        paymentMethod: 'paypal',
        rider: rider._id,
        shippingAddress: {
          street: '456 Customer St',
          city: 'Customer City',
          state: 'CS',
          zipCode: '67890',
          country: 'USA'
        },
        phone: '0987654321'
      }
    ];

    await Order.insertMany(orders);
    console.log('Sample orders added successfully');
  } catch (error) {
    console.error('Error seeding orders:', error);
    process.exit(1);
  }
};

// Run seeding operations
const seedAll = async () => {
  try {
    await clearDB();
    await seedApprovedEmails();
    await seedUsers();
    await seedProducts();
    await seedOrders();
    
    console.log('All seed data added successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedAll(); 