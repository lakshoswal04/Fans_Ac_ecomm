const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { MongoMemoryServer } = require('mongodb-memory-server');
const bcrypt = require('bcryptjs');

// Load environment variables
dotenv.config();

// Import models
const User = require('./models/User');

// Import routes
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const userRoutes = require('./routes/users');
const riderRoutes = require('./routes/riders');

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);
app.use('/api/riders', riderRoutes);

// Default route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Fans & ACs E-commerce API' });
});

// Set up MongoDB in-memory server
async function setupServer() {
  console.log('Setting up in-memory MongoDB for development...');
  
  try {
    // Create and start MongoDB memory server
    const mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    
    // Connect to the in-memory database
    await mongoose.connect(mongoUri);
    console.log('Connected to in-memory MongoDB at', mongoUri);
    
    // Create test users
    const hashedPassword = await bcrypt.hash('password123', 10);
    
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
    
    await User.insertMany(testUsers);
    console.log('Created test users successfully');
    console.log('\nTest accounts:');
    console.log('- Regular user: customer@example.com / password123');
    console.log('- Admin: admin@example.com / password123');
    console.log('- Rider: rider@example.com / password123');
    
    // Start server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Dev server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Setup error:', error);
    process.exit(1);
  }
}

// Start the server
setupServer();

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
  // Close server & exit process
  process.exit(1);
}); 