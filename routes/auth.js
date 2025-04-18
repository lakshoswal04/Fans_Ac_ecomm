const express = require('express');
const { googleAuth, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Google authentication route
router.post('/google', googleAuth);

// Get current user route (protected)
router.get('/me', protect, getMe);

module.exports = router; 