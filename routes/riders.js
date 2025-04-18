const express = require('express');
const { getRiderOrders, updateOrderStatusByRider } = require('../controllers/orderController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// All routes are rider-only
router.use(protect);
router.use(authorize('rider'));

// Rider routes
router.get('/orders', getRiderOrders);
router.put('/orders/:id/update', updateOrderStatusByRider);

module.exports = router; 