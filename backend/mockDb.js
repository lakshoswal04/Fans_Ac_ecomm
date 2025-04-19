// Mock database implementation for development
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
require('dotenv').config();

// In-memory data storage
const db = {
  users: [],
  products: [],
  orders: []
};

// Initialize with test data
async function initMockDb() {
  // Create test users with hashed passwords
  const hashedPassword = await bcrypt.hash('password123', 10);
  
  db.users = [
    {
      _id: generateId(),
      name: 'Test Customer',
      email: 'customer@example.com',
      password: hashedPassword,
      role: 'customer',
      approved: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      _id: generateId(),
      name: 'Test Admin',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'admin',
      approved: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      _id: generateId(),
      name: 'Test Rider',
      email: 'rider@example.com',
      password: hashedPassword,
      role: 'rider',
      approved: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];
  
  console.log('\nMock database initialized with test users:');
  console.log('- Regular user: customer@example.com / password123');
  console.log('- Admin: admin@example.com / password123');
  console.log('- Rider: rider@example.com / password123');
}

// Helper functions
function generateId() {
  return crypto.randomBytes(12).toString('hex');
}

// User model methods
const User = {
  findOne: async (query) => {
    // Find user by various queries
    if (query._id) {
      return db.users.find(user => user._id === query._id) || null;
    } else if (query.email) {
      return db.users.find(user => user.email === query.email) || null;
    } else if (query.$or) {
      // Handle $or operator for multiple conditions
      return db.users.find(user => 
        query.$or.some(condition => 
          (condition.email && user.email === condition.email) || 
          (condition.googleId && user.googleId === condition.googleId)
        )
      ) || null;
    }
    return null;
  },
  
  findById: async (id) => {
    return db.users.find(user => user._id === id) || null;
  },
  
  create: async (userData) => {
    const user = {
      _id: generateId(),
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date(),
      // Add JWT token generation method to user object
      getSignedJwtToken: function() {
        return jwt.sign(
          { id: this._id, role: this.role },
          process.env.JWT_SECRET || 'secret',
          { expiresIn: '30d' }
        );
      }
    };
    db.users.push(user);
    return user;
  },
  
  insertMany: async (users) => {
    const newUsers = users.map(user => ({
      _id: generateId(),
      ...user,
      createdAt: new Date(),
      updatedAt: new Date(),
      // Add JWT token generation method
      getSignedJwtToken: function() {
        return jwt.sign(
          { id: this._id, role: this.role },
          process.env.JWT_SECRET || 'secret',
          { expiresIn: '30d' }
        );
      }
    }));
    
    db.users.push(...newUsers);
    return newUsers;
  }
};

// Add token generation to mock User model prototype
User.findOne = Object.assign(User.findOne, {
  select: (fields) => {
    return async (query) => {
      const user = await User.findOne(query);
      // If requesting password field, modify result
      if (fields === '+password' && user) {
        return {
          ...user,
          // Add method
          getSignedJwtToken: function() {
            return jwt.sign(
              { id: this._id, role: this.role },
              process.env.JWT_SECRET || 'secret',
              { expiresIn: '30d' }
            );
          }
        };
      }
      return user;
    };
  }
});

// Export the mock models
module.exports = {
  initMockDb,
  User
}; 