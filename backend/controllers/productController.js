const Product = require('../models/Product');

// @desc    Get all products
// @route   GET /api/products
// @access  Public
exports.getProducts = async (req, res) => {
  try {
    // Set up query parameters
    const { category, brand, search, sort, minPrice, maxPrice } = req.query;
    
    // Build query
    const query = {};
    
    // Filter by category
    if (category) {
      query.category = category;
    }
    
    // Filter by brand
    if (brand) {
      query.brand = brand;
    }
    
    // Search by name or description
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Filter by price range
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    
    // Set up sorting
    let sortOption = { createdAt: -1 }; // Default sort by newest
    if (sort) {
      switch (sort) {
        case 'price-asc':
          sortOption = { price: 1 };
          break;
        case 'price-desc':
          sortOption = { price: -1 };
          break;
        case 'name-asc':
          sortOption = { name: 1 };
          break;
        case 'name-desc':
          sortOption = { name: -1 };
          break;
        case 'rating-desc':
          sortOption = { ratings: -1 };
          break;
      }
    }
    
    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    
    // Execute query
    const products = await Product.find(query)
      .sort(sortOption)
      .skip(startIndex)
      .limit(limit);
    
    // Get total count for pagination
    const totalProducts = await Product.countDocuments(query);
    
    // Pagination result
    const pagination = {
      currentPage: page,
      totalPages: Math.ceil(totalProducts / limit),
      totalProducts
    };
    
    res.status(200).json({
      success: true,
      count: products.length,
      pagination,
      data: products
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching products'
    });
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    
    // Handle invalid object ID format
    if (error.name === 'CastError') {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error while fetching product'
    });
  }
};

// @desc    Create new product
// @route   POST /api/products
// @access  Private (Admin)
exports.createProduct = async (req, res) => {
  try {
    // Check for duplicate SKUs in variants
    if (req.body.variants) {
      const skus = req.body.variants.map(variant => variant.sku);
      const uniqueSkus = new Set(skus);
      
      if (skus.length !== uniqueSkus.size) {
        return res.status(400).json({
          success: false,
          message: 'Duplicate SKUs found in variants. Each SKU must be unique.'
        });
      }
      
      // Check if any SKU already exists in database
      for (const sku of skus) {
        const existingProduct = await Product.findOne({ 'variants.sku': sku });
        if (existingProduct) {
          return res.status(400).json({
            success: false,
            message: `SKU ${sku} already exists in another product.`
          });
        }
      }
    }
    
    const product = await Product.create(req.body);
    
    res.status(201).json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error('Error creating product:', error);
    
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
      message: 'Server error while creating product'
    });
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private (Admin)
exports.updateProduct = async (req, res) => {
  try {
    // Check for existing product
    let product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    // Check for duplicate SKUs in variants
    if (req.body.variants) {
      const skus = req.body.variants.map(variant => variant.sku);
      const uniqueSkus = new Set(skus);
      
      if (skus.length !== uniqueSkus.size) {
        return res.status(400).json({
          success: false,
          message: 'Duplicate SKUs found in variants. Each SKU must be unique.'
        });
      }
      
      // Check if any SKU already exists in another product
      for (const sku of skus) {
        const existingProduct = await Product.findOne({
          _id: { $ne: req.params.id },
          'variants.sku': sku
        });
        
        if (existingProduct) {
          return res.status(400).json({
            success: false,
            message: `SKU ${sku} already exists in another product.`
          });
        }
      }
    }
    
    // Update product
    product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    
    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error('Error updating product:', error);
    
    // Handle invalid object ID format
    if (error.name === 'CastError') {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
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
      message: 'Server error while updating product'
    });
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private (Admin)
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    await product.deleteOne();
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    
    // Handle invalid object ID format
    if (error.name === 'CastError') {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error while deleting product'
    });
  }
}; 