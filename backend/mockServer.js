const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const { initMockDb } = require('./mockDb');

// Mock the mongoose model to use our mock implementation
jest.mock('./models/User', () => require('./mockDb').User);

// Load environment variables
dotenv.config();

// Import routes after mocking
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Default route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Fans & ACs E-commerce API (Mock Server)' });
});

// For testing Google OAuth
app.post('/api/auth/google-test', (req, res) => {
  res.json({
    success: true,
    token: 'mock-google-token-123456',
    user: {
      id: 'google-user-123',
      name: req.body.name || 'Google User',
      email: req.body.email || 'google@example.com',
      role: 'customer'
    }
  });
});

// Set up mock data and start server
async function startServer() {
  try {
    // Initialize mock database
    await initMockDb();
    
    // Start server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Mock development server running on port ${PORT}`);
      console.log(`API endpoint: http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.error('Server startup error:', error);
    process.exit(1);
  }
}

startServer(); 