const mongoose = require('mongoose');

const ApprovedEmailSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email'
      ]
    },
    role: {
      type: String,
      enum: ['customer', 'admin', 'rider'],
      default: 'customer'
    }
  },
  {
    timestamps: true
  }
);

const ApprovedEmail = mongoose.model('ApprovedEmail', ApprovedEmailSchema);

module.exports = ApprovedEmail; 