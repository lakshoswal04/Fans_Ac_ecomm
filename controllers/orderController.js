const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private (Customer)
exports.createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, phone, paymentMethod } = req.body;

    // Check if items exist
    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please add at least one item to your order'
      });
    }

    // Calculate total amount and validate items
    let totalAmount = 0;
    const validatedItems = [];

    for (const item of items) {
      // Check if product exists
      const product = await Product.findById(item.product);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product with ID ${item.product} not found`
        });
      }

      // Find the specific variant
      const variant = product.variants.find(
        v => v.color === item.color && v.size === item.size
      );

      if (!variant) {
        return res.status(404).json({
          success: false,
          message: `Variant with color ${item.color} and size ${item.size} not found for product ${product.name}`
        });
      }

      // Check if enough stock
      if (variant.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Not enough stock for ${product.name} (${item.color}, ${item.size}). Available: ${variant.stock}`
        });
      }

      // Calculate item price and add to total
      const itemPrice = product.price * item.quantity;
      totalAmount += itemPrice;

      // Add to validated items
      validatedItems.push({
        product: item.product,
        color: item.color,
        size: item.size,
        quantity: item.quantity,
        price: product.price
      });

      // Update stock
      variant.stock -= item.quantity;
    }

    // Save the updated product stock
    for (const item of items) {
      const product = await Product.findById(item.product);
      const variantIndex = product.variants.findIndex(
        v => v.color === item.color && v.size === item.size
      );
      if (variantIndex !== -1) {
        product.variants[variantIndex].stock -= item.quantity;
        await product.save();
      }
    }

    // Create order
    const order = await Order.create({
      user: req.user.id,
      items: validatedItems,
      shippingAddress,
      phone,
      totalAmount,
      paymentMethod,
      status: 'paid', // Assuming payment is automatically marked as paid for this example
      statusHistory: [
        {
          status: 'paid',
          timestamp: Date.now(),
          updatedBy: req.user.id
        }
      ]
    });

    res.status(201).json({
      success: true,
      data: order
    });
  } catch (error) {
    console.error('Error creating order:', error);
    
    // Handle validation error
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error while creating order'
    });
  }
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private (Admin)
exports.getOrders = async (req, res) => {
  try {
    // Set up query parameters
    const { status, fromDate, toDate, sort } = req.query;
    
    // Build query
    const query = {};
    
    // Filter by status
    if (status) {
      query.status = status;
    }
    
    // Filter by date range
    if (fromDate || toDate) {
      query.createdAt = {};
      if (fromDate) query.createdAt.$gte = new Date(fromDate);
      if (toDate) {
        const endDate = new Date(toDate);
        endDate.setHours(23, 59, 59, 999);
        query.createdAt.$lte = endDate;
      }
    }
    
    // Set up sorting
    let sortOption = { createdAt: -1 }; // Default sort by newest
    if (sort) {
      switch (sort) {
        case 'total-asc':
          sortOption = { totalAmount: 1 };
          break;
        case 'total-desc':
          sortOption = { totalAmount: -1 };
          break;
        case 'date-asc':
          sortOption = { createdAt: 1 };
          break;
      }
    }
    
    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    
    // Execute query
    const orders = await Order.find(query)
      .populate({
        path: 'user',
        select: 'name email phone'
      })
      .populate({
        path: 'items.product',
        select: 'name imageUrl'
      })
      .populate({
        path: 'rider',
        select: 'name phone'
      })
      .sort(sortOption)
      .skip(startIndex)
      .limit(limit);
    
    // Get total count for pagination
    const totalOrders = await Order.countDocuments(query);
    
    // Pagination result
    const pagination = {
      currentPage: page,
      totalPages: Math.ceil(totalOrders / limit),
      totalOrders
    };
    
    res.status(200).json({
      success: true,
      count: orders.length,
      pagination,
      data: orders
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching orders'
    });
  }
};

// @desc    Get customer orders
// @route   GET /api/orders/my-orders
// @access  Private (Customer)
exports.getCustomerOrders = async (req, res) => {
  try {
    // Build query for customer's orders
    const query = { user: req.user.id };
    
    // Set up sorting (newest first)
    const sortOption = { createdAt: -1 };
    
    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    
    // Execute query
    const orders = await Order.find(query)
      .populate({
        path: 'items.product',
        select: 'name imageUrl'
      })
      .populate({
        path: 'rider',
        select: 'name phone'
      })
      .sort(sortOption)
      .skip(startIndex)
      .limit(limit);
    
    // Get total count for pagination
    const totalOrders = await Order.countDocuments(query);
    
    // Pagination result
    const pagination = {
      currentPage: page,
      totalPages: Math.ceil(totalOrders / limit),
      totalOrders
    };
    
    res.status(200).json({
      success: true,
      count: orders.length,
      pagination,
      data: orders
    });
  } catch (error) {
    console.error('Error fetching customer orders:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching orders'
    });
  }
};

// @desc    Get rider orders
// @route   GET /api/orders/rider-orders
// @access  Private (Rider)
exports.getRiderOrders = async (req, res) => {
  try {
    // Build query for rider's assigned orders
    const query = { rider: req.user.id };
    
    // Filter by status if specified
    if (req.query.status) {
      query.status = req.query.status;
    }
    
    // Set up sorting (newest first)
    const sortOption = { createdAt: -1 };
    
    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    
    // Execute query
    const orders = await Order.find(query)
      .populate({
        path: 'user',
        select: 'name email phone address'
      })
      .populate({
        path: 'items.product',
        select: 'name imageUrl'
      })
      .sort(sortOption)
      .skip(startIndex)
      .limit(limit);
    
    // Get total count for pagination
    const totalOrders = await Order.countDocuments(query);
    
    // Pagination result
    const pagination = {
      currentPage: page,
      totalPages: Math.ceil(totalOrders / limit),
      totalOrders
    };
    
    res.status(200).json({
      success: true,
      count: orders.length,
      pagination,
      data: orders
    });
  } catch (error) {
    console.error('Error fetching rider orders:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching orders'
    });
  }
};

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Private (Admin/Customer/Rider)
exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate({
        path: 'user',
        select: 'name email phone address'
      })
      .populate({
        path: 'items.product',
        select: 'name imageUrl category brand'
      })
      .populate({
        path: 'rider',
        select: 'name phone'
      })
      .populate({
        path: 'statusHistory.updatedBy',
        select: 'name role'
      });
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }
    
    // Check authorization for customers and riders
    if (req.user.role === 'customer' && order.user._id.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this order'
      });
    }
    
    if (req.user.role === 'rider' && (!order.rider || order.rider._id.toString() !== req.user.id)) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this order'
      });
    }
    
    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    console.error('Error fetching order:', error);
    
    // Handle invalid object ID format
    if (error.name === 'CastError') {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error while fetching order'
    });
  }
};

// @desc    Update order status (Admin)
// @route   PUT /api/orders/:id/status
// @access  Private (Admin)
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status, riderId, deliveryNotes } = req.body;
    
    // Get order
    let order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }
    
    // Validate status transition
    if (status === 'shipped' && order.status !== 'paid') {
      return res.status(400).json({
        success: false,
        message: 'Order must be in "paid" status before changing to "shipped"'
      });
    }
    
    // Validate rider assignment for shipped status
    if (status === 'shipped' && !riderId) {
      return res.status(400).json({
        success: false,
        message: 'Must assign a rider when changing status to "shipped"'
      });
    }
    
    // Check if rider exists and has rider role
    if (riderId) {
      const rider = await User.findById(riderId);
      
      if (!rider) {
        return res.status(404).json({
          success: false,
          message: 'Rider not found'
        });
      }
      
      if (rider.role !== 'rider') {
        return res.status(400).json({
          success: false,
          message: 'Selected user is not a rider'
        });
      }
      
      // Assign rider to order
      order.rider = riderId;
    }
    
    // Update order status
    order.status = status;
    order.updatedBy = req.user.id; // For the pre-save middleware
    
    // Add delivery notes if provided
    if (deliveryNotes) {
      order.deliveryNotes = deliveryNotes;
    }
    
    // Save the updated order
    await order.save();
    
    // Get updated order with populated fields
    const updatedOrder = await Order.findById(req.params.id)
      .populate({
        path: 'user',
        select: 'name email phone'
      })
      .populate({
        path: 'items.product',
        select: 'name imageUrl'
      })
      .populate({
        path: 'rider',
        select: 'name phone'
      })
      .populate({
        path: 'statusHistory.updatedBy',
        select: 'name role'
      });
    
    res.status(200).json({
      success: true,
      data: updatedOrder
    });
  } catch (error) {
    console.error('Error updating order status:', error);
    
    // Handle invalid object ID format
    if (error.name === 'CastError') {
      return res.status(404).json({
        success: false,
        message: 'Order or rider not found'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error while updating order status'
    });
  }
};

// @desc    Update order status (Rider)
// @route   PUT /api/orders/:id/rider-update
// @access  Private (Rider)
exports.updateOrderStatusByRider = async (req, res) => {
  try {
    const { status, deliveryNotes } = req.body;
    
    // Validate status
    if (status !== 'delivered' && status !== 'undelivered') {
      return res.status(400).json({
        success: false,
        message: 'Rider can only update status to "delivered" or "undelivered"'
      });
    }
    
    // Get order
    let order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }
    
    // Verify rider is assigned to this order
    if (!order.rider || order.rider.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to update this order'
      });
    }
    
    // Validate status transition
    if (order.status !== 'shipped') {
      return res.status(400).json({
        success: false,
        message: 'Order must be in "shipped" status before changing to "delivered" or "undelivered"'
      });
    }
    
    // Update order status
    order.status = status;
    order.updatedBy = req.user.id; // For the pre-save middleware
    
    // Add delivery notes if provided
    if (deliveryNotes) {
      order.deliveryNotes = deliveryNotes;
    }
    
    // Save the updated order
    await order.save();
    
    // Get updated order with populated fields
    const updatedOrder = await Order.findById(req.params.id)
      .populate({
        path: 'user',
        select: 'name email phone'
      })
      .populate({
        path: 'items.product',
        select: 'name imageUrl'
      })
      .populate({
        path: 'rider',
        select: 'name phone'
      })
      .populate({
        path: 'statusHistory.updatedBy',
        select: 'name role'
      });
    
    res.status(200).json({
      success: true,
      data: updatedOrder
    });
  } catch (error) {
    console.error('Error updating order status by rider:', error);
    
    // Handle invalid object ID format
    if (error.name === 'CastError') {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error while updating order status'
    });
  }
}; 