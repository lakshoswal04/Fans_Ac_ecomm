const express = require('express');
const {
  createOrder,
  getOrders,
  getOrder,
  getCustomerOrders,
  getRiderOrders,
  updateOrderStatus,
  updateOrderStatusByRider
} = require('../controllers/orderController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Customer routes
router.post('/', protect, authorize('customer'), createOrder);
router.get('/my-orders', protect, authorize('customer'), getCustomerOrders);

// Rider routes
router.get('/rider-orders', protect, authorize('rider'), getRiderOrders);
router.put('/:id/rider-update', protect, authorize('rider'), updateOrderStatusByRider);

// Admin routes
router.get('/', protect, authorize('admin'), getOrders);
router.put('/:id/status', protect, authorize('admin'), updateOrderStatus);

// Shared routes with different access levels
router.get('/:id', protect, getOrder); // Access checked inside controller

module.exports = router; 