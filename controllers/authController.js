const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');
const ApprovedEmail = require('../models/ApprovedEmail');
const jwt = require('jsonwebtoken');

// Initialize Google OAuth client
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// @desc    Login or register with Google
// @route   POST /api/auth/google
// @access  Public
exports.googleAuth = async (req, res) => {
  try {
    const { tokenId, email } = req.body;
    
    if (!tokenId) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a token ID'
      });
    }

    // FOR TESTING PURPOSES ONLY
    // In production, you would use the Google verification process
    if (tokenId === 'mock_token_id') {
      if (!email) {
        return res.status(400).json({
          success: false,
          message: 'Please provide an email for mock authentication'
        });
      }

      // Check if email is in approved emails
      const approvedEmail = await ApprovedEmail.findOne({ email });
      
      if (!approvedEmail) {
        return res.status(401).json({
          success: false,
          message: 'Your email is not approved for registration. Please contact admin.'
        });
      }

      // Get or create user
      let user = await User.findOne({ email });

      if (!user) {
        // Create new user if doesn't exist
        user = await User.create({
          name: email.split('@')[0], // Simple name from email
          email,
          googleId: 'mock_' + email, // Mock Google ID
          role: approvedEmail.role,
          approved: true
        });
      } else {
        // Update existing user with googleId if not already set
        if (!user.googleId) {
          user.googleId = 'mock_' + email;
          await user.save();
        }
        
        // Update approval status from approved emails
        if (!user.approved && approvedEmail) {
          user.approved = true;
          user.role = approvedEmail.role;
          await user.save();
        }
      }

      // Generate token
      const token = user.getSignedJwtToken();

      // Return response
      return res.status(200).json({
        success: true,
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
    } else {
      // PRODUCTION GOOGLE AUTH FLOW
      // This would be used in the actual production environment
      try {
        // Verify Google token
        const ticket = await client.verifyIdToken({
          idToken: tokenId,
          audience: process.env.GOOGLE_CLIENT_ID
        });

        const payload = ticket.getPayload();
        const { email, name, sub: googleId } = payload;

        // Check if email is in approved emails
        const approvedEmail = await ApprovedEmail.findOne({ email });
        
        if (!approvedEmail) {
          return res.status(401).json({
            success: false,
            message: 'Your email is not approved for registration. Please contact admin.'
          });
        }

        // Check if user exists by email or googleId
        let user = await User.findOne({ $or: [{ email }, { googleId }] });

        if (!user) {
          // Create new user if doesn't exist
          user = await User.create({
            name,
            email,
            googleId,
            role: approvedEmail.role,
            approved: true
          });
        } else {
          // Update existing user with googleId if not already set
          if (!user.googleId) {
            user.googleId = googleId;
            await user.save();
          }
          
          // Update approval status from approved emails
          if (!user.approved && approvedEmail) {
            user.approved = true;
            user.role = approvedEmail.role;
            await user.save();
          }
        }

        // Generate token
        const token = user.getSignedJwtToken();

        // Return response
        return res.status(200).json({
          success: true,
          token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
          }
        });
      } catch (error) {
        console.error('Google auth error:', error);
        return res.status(500).json({
          success: false,
          message: 'Invalid token or server error during authentication'
        });
      }
    }
  } catch (error) {
    console.error('Auth error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during authentication'
    });
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        address: user.address,
        phone: user.phone
      }
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching user'
    });
  }
}; 