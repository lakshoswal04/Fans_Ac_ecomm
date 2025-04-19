const User = require('../models/User');
const ApprovedEmail = require('../models/ApprovedEmail');

// @desc    Get all users (admin only)
// @route   GET /api/users
// @access  Private (Admin)
exports.getUsers = async (req, res) => {
  try {
    // Filter by role if specified
    const query = {};
    if (req.query.role) {
      query.role = req.query.role;
    }
    
    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    
    const users = await User.find(query)
      .select('-__v')
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit);
    
    const totalUsers = await User.countDocuments(query);
    
    res.status(200).json({
      success: true,
      count: users.length,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalUsers / limit),
        totalUsers
      },
      data: users
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching users'
    });
  }
};

// @desc    Get all riders (admin only)
// @route   GET /api/users/riders
// @access  Private (Admin)
exports.getRiders = async (req, res) => {
  try {
    // Query only users with rider role
    const query = { role: 'rider' };
    
    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    
    const riders = await User.find(query)
      .select('name email phone approved')
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit);
    
    const totalRiders = await User.countDocuments(query);
    
    res.status(200).json({
      success: true,
      count: riders.length,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalRiders / limit),
        totalRiders
      },
      data: riders
    });
  } catch (error) {
    console.error('Error fetching riders:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching riders'
    });
  }
};

// @desc    Get single user
// @route   GET /api/users/:id
// @access  Private (Admin)
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-__v');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    
    // Handle invalid object ID format
    if (error.name === 'CastError') {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error while fetching user'
    });
  }
};

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private (Admin)
exports.updateUser = async (req, res) => {
  try {
    // Check if user exists
    let user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Don't allow role change if original role is admin and current user is not an admin
    if (req.body.role && user.role === 'admin' && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to change admin role'
      });
    }
    
    // Update user
    user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    ).select('-__v');
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Error updating user:', error);
    
    // Handle invalid object ID format
    if (error.name === 'CastError') {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
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
      message: 'Server error while updating user'
    });
  }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private (Admin)
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Don't allow deleting admin users
    if (user.role === 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Cannot delete admin users'
      });
    }
    
    await user.deleteOne();
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    
    // Handle invalid object ID format
    if (error.name === 'CastError') {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error while deleting user'
    });
  }
};

// @desc    Get all approved emails
// @route   GET /api/users/approved-emails
// @access  Private (Admin)
exports.getApprovedEmails = async (req, res) => {
  try {
    // Filter by role if specified
    const query = {};
    if (req.query.role) {
      query.role = req.query.role;
    }
    
    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    
    const approvedEmails = await ApprovedEmail.find(query)
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit);
    
    const totalEmails = await ApprovedEmail.countDocuments(query);
    
    res.status(200).json({
      success: true,
      count: approvedEmails.length,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalEmails / limit),
        totalEmails
      },
      data: approvedEmails
    });
  } catch (error) {
    console.error('Error fetching approved emails:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching approved emails'
    });
  }
};

// @desc    Add approved email
// @route   POST /api/users/approved-emails
// @access  Private (Admin)
exports.addApprovedEmail = async (req, res) => {
  try {
    const { email, role } = req.body;
    
    // Check if email already exists
    const existingEmail = await ApprovedEmail.findOne({ email });
    
    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: 'Email already approved'
      });
    }
    
    // Create new approved email
    const approvedEmail = await ApprovedEmail.create({
      email,
      role: role || 'customer'
    });
    
    res.status(201).json({
      success: true,
      data: approvedEmail
    });
  } catch (error) {
    console.error('Error adding approved email:', error);
    
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
      message: 'Server error while adding approved email'
    });
  }
};

// @desc    Delete approved email
// @route   DELETE /api/users/approved-emails/:id
// @access  Private (Admin)
exports.deleteApprovedEmail = async (req, res) => {
  try {
    const approvedEmail = await ApprovedEmail.findById(req.params.id);
    
    if (!approvedEmail) {
      return res.status(404).json({
        success: false,
        message: 'Approved email not found'
      });
    }
    
    await approvedEmail.deleteOne();
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    console.error('Error deleting approved email:', error);
    
    // Handle invalid object ID format
    if (error.name === 'CastError') {
      return res.status(404).json({
        success: false,
        message: 'Approved email not found'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error while deleting approved email'
    });
  }
}; 