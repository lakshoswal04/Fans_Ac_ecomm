const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

// This script sets up an in-memory MongoDB server for development
// It creates test users that you can use to login

async function setupLocalDb() {
  console.log('Setting up local in-memory MongoDB for development...');
  
  // Create in-memory MongoDB
  const mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  
  // Connect to the in-memory database
  await mongoose.connect(mongoUri);
  console.log('Connected to in-memory MongoDB at', mongoUri);
  
  // Create test users
  await createTestUsers();
  
  console.log('\nSetup complete!');
  console.log('\nTest users:');
  console.log('- Regular user: customer@example.com / password123');
  console.log('- Admin: admin@example.com / password123');
  console.log('- Rider: rider@example.com / password123');
  console.log('\nPress Ctrl+C to exit this script and start your server');
}

async function createTestUsers() {
  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('password123', 10);
  
  // Create users
  const testUsers = [
    {
      name: 'Test Customer',
      email: 'customer@example.com',
      password: hashedPassword,
      role: 'customer',
      approved: true
    },
    {
      name: 'Test Admin',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'admin',
      approved: true
    },
    {
      name: 'Test Rider',
      email: 'rider@example.com',
      password: hashedPassword,
      role: 'rider',
      approved: true
    }
  ];
  
  try {
    await User.insertMany(testUsers);
    console.log('Created test users successfully');
  } catch (error) {
    console.error('Error creating test users:', error);
  }
}

setupLocalDb().catch(console.error); 