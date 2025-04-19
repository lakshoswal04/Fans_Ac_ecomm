const express = require('express');
const { register, login, googleAuth, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Register and login routes
router.post('/register', register);
router.post('/login', login);

// Google authentication route
router.post('/google', googleAuth);

// Get current user route (protected)
router.get('/me', protect, getMe);

module.exports = router; 