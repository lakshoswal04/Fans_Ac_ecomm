const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

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

// Add fallback to local MongoDB if Atlas connection fails
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Atlas connected successfully');
  } catch (atlasError) {
    console.log('MongoDB Atlas connection error:', atlasError.message);
    console.log('Attempting to connect to local MongoDB...');
    
    try {
      // Try connecting to a local MongoDB instance
      await mongoose.connect('mongodb://localhost:27017/fans_ac_ecomm');
      console.log('Connected to local MongoDB successfully');
    } catch (localError) {
      console.error('Local MongoDB connection error:', localError.message);
      process.exit(1);
    }
  }
};

// Connect to MongoDB
connectDB()
  .then(() => {
    // Start server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
  // Close server & exit process
  process.exit(1);
}); 