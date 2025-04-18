const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a product name'],
      trim: true,
      maxlength: [100, 'Name cannot be more than 100 characters']
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
      maxlength: [500, 'Description cannot be more than 500 characters']
    },
    category: {
      type: String,
      required: [true, 'Please add a category'],
      enum: ['fan', 'ac']
    },
    price: {
      type: Number,
      required: [true, 'Please add a price'],
      min: [0, 'Price must be positive']
    },
    variants: [
      {
        color: {
          type: String,
          required: true
        },
        size: {
          type: String,
          required: true
        },
        stock: {
          type: Number,
          required: [true, 'Please add stock quantity'],
          min: [0, 'Stock cannot be negative']
        },
        sku: {
          type: String,
          required: true,
          unique: true
        }
      }
    ],
    imageUrl: {
      type: String,
      required: [true, 'Please add an image URL']
    },
    brand: {
      type: String,
      required: [true, 'Please add a brand']
    },
    isPopular: {
      type: Boolean,
      default: false
    },
    features: [String],
    warranty: {
      type: String,
      required: true
    },
    ratings: {
      type: Number,
      default: 0,
      min: [0, 'Rating must be at least 0'],
      max: [5, 'Rating cannot be more than 5']
    },
    reviewCount: {
      type: Number,
      default: 0,
      min: [0, 'Review count must be positive']
    }
  },
  {
    timestamps: true
  }
);

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product; 