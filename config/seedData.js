const mongoose = require('mongoose');
const User = require('../models/User');
const Product = require('../models/Product');
const ApprovedEmail = require('../models/ApprovedEmail');
const Order = require('../models/Order');

// Clear all existing data
const clearData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await ApprovedEmail.deleteMany();
    await Order.deleteMany();
    console.log('All data cleared');
  } catch (error) {
    console.error('Error clearing data:', error);
    process.exit(1);
  }
};

// Add sample approved emails
const addApprovedEmails = async () => {
  try {
    const approvedEmails = [
      {
        email: 'admin@example.com',
        role: 'admin'
      },
      {
        email: 'customer@example.com',
        role: 'customer'
      },
      {
        email: 'rider1@example.com',
        role: 'rider'
      },
      {
        email: 'rider2@example.com',
        role: 'rider'
      }
    ];

    await ApprovedEmail.create(approvedEmails);
    console.log('Sample approved emails added');
  } catch (error) {
    console.error('Error adding approved emails:', error);
    process.exit(1);
  }
};

// Add sample users
const addUsers = async () => {
  try {
    const users = [
      {
        name: 'Admin User',
        email: 'admin@example.com',
        role: 'admin',
        approved: true
      },
      {
        name: 'Customer User',
        email: 'customer@example.com',
        role: 'customer',
        address: {
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          country: 'USA'
        },
        phone: '555-123-4567',
        approved: true
      },
      {
        name: 'Rider One',
        email: 'rider1@example.com',
        role: 'rider',
        phone: '555-987-6543',
        approved: true
      },
      {
        name: 'Rider Two',
        email: 'rider2@example.com',
        role: 'rider',
        phone: '555-456-7890',
        approved: true
      }
    ];

    await User.create(users);
    console.log('Sample users added');
  } catch (error) {
    console.error('Error adding users:', error);
    process.exit(1);
  }
};

// Add sample products
const addProducts = async () => {
  try {
    const products = [
      {
        name: 'Premium Ceiling Fan',
        description: 'High-quality ceiling fan with remote control and LED light',
        category: 'fan',
        price: 129.99,
        variants: [
          {
            color: 'White',
            size: '52 inch',
            stock: 25,
            sku: 'FAN-W-52'
          },
          {
            color: 'Brown',
            size: '52 inch',
            stock: 15,
            sku: 'FAN-B-52'
          },
          {
            color: 'White',
            size: '42 inch',
            stock: 20,
            sku: 'FAN-W-42'
          },
          {
            color: 'Brown',
            size: '42 inch',
            stock: 10,
            sku: 'FAN-B-42'
          }
        ],
        imageUrl: 'https://example.com/images/premium-fan.jpg',
        brand: 'CoolBreeze',
        isPopular: true,
        features: [
          'Remote Control',
          'LED Light',
          'Energy Efficient',
          '3 Speed Settings',
          'Reversible Motor'
        ],
        warranty: '2 years'
      },
      {
        name: 'Portable Standing Fan',
        description: 'Adjustable height, oscillating standing fan for any room',
        category: 'fan',
        price: 49.99,
        variants: [
          {
            color: 'Black',
            size: '16 inch',
            stock: 30,
            sku: 'STD-B-16'
          },
          {
            color: 'White',
            size: '16 inch',
            stock: 25,
            sku: 'STD-W-16'
          },
          {
            color: 'Black',
            size: '18 inch',
            stock: 20,
            sku: 'STD-B-18'
          },
          {
            color: 'White',
            size: '18 inch',
            stock: 15,
            sku: 'STD-W-18'
          }
        ],
        imageUrl: 'https://example.com/images/standing-fan.jpg',
        brand: 'AirMax',
        features: [
          'Oscillation',
          'Adjustable Height',
          '3 Speed Settings',
          'Tilt Adjustment',
          'Easy Assembly'
        ],
        warranty: '1 year'
      },
      {
        name: 'Table Fan',
        description: 'Compact and powerful table fan for desks and small spaces',
        category: 'fan',
        price: 29.99,
        variants: [
          {
            color: 'Black',
            size: '12 inch',
            stock: 40,
            sku: 'TBL-B-12'
          },
          {
            color: 'White',
            size: '12 inch',
            stock: 35,
            sku: 'TBL-W-12'
          },
          {
            color: 'Blue',
            size: '12 inch',
            stock: 20,
            sku: 'TBL-BL-12'
          },
          {
            color: 'Black',
            size: '9 inch',
            stock: 25,
            sku: 'TBL-B-9'
          },
          {
            color: 'White',
            size: '9 inch',
            stock: 20,
            sku: 'TBL-W-9'
          }
        ],
        imageUrl: 'https://example.com/images/table-fan.jpg',
        brand: 'AirMax',
        features: [
          'Compact Design',
          'Quiet Operation',
          '3 Speed Settings',
          'Tilt Adjustment'
        ],
        warranty: '1 year'
      },
      {
        name: 'Window AC',
        description: 'Energy-efficient window air conditioner for small to medium rooms',
        category: 'ac',
        price: 249.99,
        variants: [
          {
            color: 'White',
            size: '8,000 BTU',
            stock: 15,
            sku: 'AC-W-8K'
          },
          {
            color: 'White',
            size: '10,000 BTU',
            stock: 10,
            sku: 'AC-W-10K'
          },
          {
            color: 'White',
            size: '12,000 BTU',
            stock: 8,
            sku: 'AC-W-12K'
          }
        ],
        imageUrl: 'https://example.com/images/window-ac.jpg',
        brand: 'CoolTech',
        isPopular: true,
        features: [
          'Energy Star Rated',
          'Remote Control',
          'Digital Display',
          'Sleep Mode',
          'Washable Filter'
        ],
        warranty: '3 years'
      },
      {
        name: 'Split AC',
        description: 'Quiet and efficient split air conditioner with inverter technology',
        category: 'ac',
        price: 599.99,
        variants: [
          {
            color: 'White',
            size: '12,000 BTU',
            stock: 10,
            sku: 'SPL-W-12K'
          },
          {
            color: 'White',
            size: '18,000 BTU',
            stock: 8,
            sku: 'SPL-W-18K'
          },
          {
            color: 'White',
            size: '24,000 BTU',
            stock: 5,
            sku: 'SPL-W-24K'
          }
        ],
        imageUrl: 'https://example.com/images/split-ac.jpg',
        brand: 'CoolTech',
        isPopular: true,
        features: [
          'Inverter Technology',
          'Wi-Fi Control',
          'Sleep Mode',
          'Auto Restart',
          'Air Purifying Filter',
          'Low Noise Operation'
        ],
        warranty: '5 years'
      }
    ];

    await Product.create(products);
    console.log('Sample products added');
  } catch (error) {
    console.error('Error adding products:', error);
    process.exit(1);
  }
};

// Add sample orders
const addOrders = async () => {
  try {
    // Get sample user and product IDs
    const customer = await User.findOne({ email: 'customer@example.com' });
    const rider = await User.findOne({ email: 'rider1@example.com' });
    const products = await Product.find().limit(2);

    if (!customer || !rider || products.length < 2) {
      console.error('Missing required seed data for creating orders');
      return;
    }

    const orders = [
      {
        user: customer._id,
        items: [
          {
            product: products[0]._id,
            color: products[0].variants[0].color,
            size: products[0].variants[0].size,
            quantity: 1,
            price: products[0].price
          }
        ],
        shippingAddress: {
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          country: 'USA'
        },
        phone: '555-123-4567',
        totalAmount: products[0].price,
        status: 'paid',
        paymentMethod: 'credit_card',
        paymentResult: {
          id: 'sample_payment_1',
          status: 'completed',
          update_time: new Date(),
          email_address: customer.email
        },
        statusHistory: [
          {
            status: 'paid',
            timestamp: new Date(),
            updatedBy: customer._id
          }
        ]
      },
      {
        user: customer._id,
        items: [
          {
            product: products[1]._id,
            color: products[1].variants[0].color,
            size: products[1].variants[0].size,
            quantity: 1,
            price: products[1].price
          }
        ],
        shippingAddress: {
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          country: 'USA'
        },
        phone: '555-123-4567',
        totalAmount: products[1].price,
        status: 'shipped',
        paymentMethod: 'credit_card',
        paymentResult: {
          id: 'sample_payment_2',
          status: 'completed',
          update_time: new Date(Date.now() - 86400000), // 1 day ago
          email_address: customer.email
        },
        rider: rider._id,
        statusHistory: [
          {
            status: 'paid',
            timestamp: new Date(Date.now() - 172800000), // 2 days ago
            updatedBy: customer._id
          },
          {
            status: 'shipped',
            timestamp: new Date(Date.now() - 86400000), // 1 day ago
            updatedBy: rider._id
          }
        ]
      }
    ];

    await Order.create(orders);
    console.log('Sample orders added');
  } catch (error) {
    console.error('Error adding orders:', error);
    process.exit(1);
  }
};

// Seed all data
const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected...');

    // Clear existing data
    await clearData();

    // Add sample data
    await addApprovedEmails();
    await addUsers();
    await addProducts();
    await addOrders();

    console.log('All seed data added successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

module.exports = seedData; 