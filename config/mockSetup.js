const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const User = require('../models/User');

// Load environment variables
dotenv.config();

// Function to generate JWT token for testing
const generateToken = (userId, role) => {
  return jwt.sign(
    { id: userId, role: role },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );
};

// Function to get mock tokens
const getMockTokens = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected for mock token generation...');

    // Find sample users
    const admin = await User.findOne({ email: 'admin@example.com' });
    const customer = await User.findOne({ email: 'customer@example.com' });
    const rider = await User.findOne({ email: 'rider1@example.com' });

    if (!admin || !customer || !rider) {
      console.error('Sample users not found. Please run seed script first.');
      process.exit(1);
    }

    // Generate tokens
    const adminToken = generateToken(admin._id, admin.role);
    const customerToken = generateToken(customer._id, customer.role);
    const riderToken = generateToken(rider._id, rider.role);

    console.log('\n=== TOKENS FOR API TESTING ===');
    console.log(`\nAdmin Token (admin@example.com):`);
    console.log(adminToken);
    
    console.log(`\nCustomer Token (customer@example.com):`);
    console.log(customerToken);
    
    console.log(`\nRider Token (rider1@example.com):`);
    console.log(riderToken);
    
    console.log('\nUse these tokens with your Postman collection by setting the "token" variable.');
    console.log('===========================\n');

    mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error generating mock tokens:', error);
    process.exit(1);
  }
};

// Run the function
getMockTokens(); 