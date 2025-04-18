const axios = require('axios');

// Base URL for the API
const API_URL = 'http://localhost:5000/api';

// Store tokens for different user roles
let adminToken = '';
let customerToken = '';
let riderToken = '';

// Function to authenticate with different roles
async function authenticate() {
  try {
    // Authenticate as admin
    const adminResponse = await axios.post(`${API_URL}/auth/google`, {
      tokenId: 'mock_token_id',
      email: 'admin@example.com'
    });
    adminToken = adminResponse.data.token;
    console.log('\nAdmin authenticated successfully!');
    
    // Authenticate as customer
    const customerResponse = await axios.post(`${API_URL}/auth/google`, {
      tokenId: 'mock_token_id',
      email: 'customer@example.com'
    });
    customerToken = customerResponse.data.token;
    console.log('Customer authenticated successfully!');
    
    // Authenticate as rider
    const riderResponse = await axios.post(`${API_URL}/auth/google`, {
      tokenId: 'mock_token_id',
      email: 'rider1@example.com'
    });
    riderToken = riderResponse.data.token;
    console.log('Rider authenticated successfully!');
    
    return true;
  } catch (error) {
    console.error('Authentication failed:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    } else {
      console.error(error.message);
    }
    return false;
  }
}

// Test getting all products (public endpoint)
async function testGetProducts() {
  try {
    console.log('\n=== Testing Get Products (Public) ===');
    const response = await axios.get(`${API_URL}/products`);
    console.log(`Retrieved ${response.data.data.length} products`);
    
    // Save first product ID for later tests
    if (response.data.data.length > 0) {
      const firstProduct = response.data.data[0];
      console.log(`First product: ${firstProduct.name} (ID: ${firstProduct._id})`);
      return firstProduct._id;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching products:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    } else {
      console.error(error.message);
    }
    return null;
  }
}

// Test creating a product (admin only)
async function testCreateProduct() {
  try {
    console.log('\n=== Testing Create Product (Admin) ===');
    const product = {
      name: 'Test Product',
      description: 'This is a test product',
      category: 'fan',
      price: 99.99,
      variants: [
        {
          color: 'White',
          size: '42 inch',
          stock: 10,
          sku: 'TEST-W-42'
        }
      ],
      imageUrl: 'https://example.com/images/test-product.jpg',
      brand: 'TestBrand',
      features: ['Feature 1', 'Feature 2'],
      warranty: '1 year'
    };
    
    const response = await axios.post(
      `${API_URL}/products`,
      product,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminToken}`
        }
      }
    );
    
    console.log('Product created successfully!');
    console.log(`Product ID: ${response.data.data._id}`);
    return response.data.data._id;
  } catch (error) {
    console.error('Error creating product:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    } else {
      console.error(error.message);
    }
    return null;
  }
}

// Test creating an order (customer only)
async function testCreateOrder(productId) {
  try {
    console.log('\n=== Testing Create Order (Customer) ===');
    const order = {
      items: [
        {
          product: productId,
          color: 'White',
          size: '42 inch',
          quantity: 1
        }
      ],
      shippingAddress: {
        street: '123 Test St',
        city: 'Test City',
        state: 'TS',
        zipCode: '12345',
        country: 'USA'
      },
      phone: '555-123-4567',
      paymentMethod: 'credit_card'
    };
    
    const response = await axios.post(
      `${API_URL}/orders`,
      order,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${customerToken}`
        }
      }
    );
    
    console.log('Order created successfully!');
    console.log(`Order ID: ${response.data.data._id}`);
    return response.data.data._id;
  } catch (error) {
    console.error('Error creating order:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    } else {
      console.error(error.message);
    }
    return null;
  }
}

// Test getting customer orders
async function testGetCustomerOrders() {
  try {
    console.log('\n=== Testing Get Customer Orders ===');
    const response = await axios.get(
      `${API_URL}/orders/my-orders`,
      {
        headers: {
          'Authorization': `Bearer ${customerToken}`
        }
      }
    );
    
    console.log(`Retrieved ${response.data.count} orders`);
    if (response.data.data.length > 0) {
      const firstOrder = response.data.data[0];
      console.log(`First order ID: ${firstOrder._id}, Status: ${firstOrder.status}`);
      return firstOrder._id;
    }
    
    return null;
  } catch (error) {
    console.error('Error getting customer orders:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    } else {
      console.error(error.message);
    }
    return null;
  }
}

// Test getting all orders (admin only)
async function testGetAllOrders() {
  try {
    console.log('\n=== Testing Get All Orders (Admin) ===');
    const response = await axios.get(
      `${API_URL}/orders`,
      {
        headers: {
          'Authorization': `Bearer ${adminToken}`
        }
      }
    );
    
    console.log(`Retrieved ${response.data.count} orders as admin`);
    if (response.data.data.length > 0) {
      console.log('Order statuses:', response.data.data.map(order => order.status).join(', '));
    }
    
    return true;
  } catch (error) {
    console.error('Error getting all orders:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    } else {
      console.error(error.message);
    }
    return false;
  }
}

// Test updating order status (admin only)
async function testUpdateOrderStatus(orderId) {
  try {
    console.log('\n=== Testing Update Order Status (Admin) ===');
    
    // First, get all riders
    const ridersResponse = await axios.get(
      `${API_URL}/users/riders`,
      {
        headers: {
          'Authorization': `Bearer ${adminToken}`
        }
      }
    );
    
    console.log(`Retrieved ${ridersResponse.data.count} riders`);
    
    if (ridersResponse.data.data.length === 0) {
      console.error('No riders found to assign to the order');
      return false;
    }
    
    const riderId = ridersResponse.data.data[0]._id;
    console.log(`Using rider ID: ${riderId}`);
    
    // Update order status to shipped and assign rider
    const updateResponse = await axios.put(
      `${API_URL}/orders/${orderId}/status`,
      {
        status: 'shipped',
        riderId: riderId,
        deliveryNotes: 'Test delivery note'
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminToken}`
        }
      }
    );
    
    console.log('Order status updated successfully!');
    console.log(`New status: ${updateResponse.data.data.status}`);
    console.log(`Assigned rider: ${updateResponse.data.data.rider._id}`);
    
    return true;
  } catch (error) {
    console.error('Error updating order status:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    } else {
      console.error(error.message);
    }
    return false;
  }
}

// Test getting rider orders
async function testGetRiderOrders() {
  try {
    console.log('\n=== Testing Get Rider Orders ===');
    const response = await axios.get(
      `${API_URL}/orders/rider-orders`,
      {
        headers: {
          'Authorization': `Bearer ${riderToken}`
        }
      }
    );
    
    console.log(`Retrieved ${response.data.count} orders for rider`);
    if (response.data.data.length > 0) {
      const firstOrder = response.data.data[0];
      console.log(`Rider's first order ID: ${firstOrder._id}, Status: ${firstOrder.status}`);
      return firstOrder._id;
    }
    
    return null;
  } catch (error) {
    console.error('Error getting rider orders:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    } else {
      console.error(error.message);
    }
    return null;
  }
}

// Test updating order status by rider
async function testUpdateOrderStatusByRider(orderId) {
  try {
    console.log('\n=== Testing Update Order Status (Rider) ===');
    
    if (!orderId) {
      console.error('No order ID provided to update');
      return false;
    }
    
    const updateResponse = await axios.put(
      `${API_URL}/orders/${orderId}/rider-update`,
      {
        status: 'delivered',
        deliveryNotes: 'Delivered to customer by rider'
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${riderToken}`
        }
      }
    );
    
    console.log('Order status updated by rider successfully!');
    console.log(`New status: ${updateResponse.data.data.status}`);
    
    return true;
  } catch (error) {
    console.error('Error updating order status by rider:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    } else {
      console.error(error.message);
    }
    return false;
  }
}

// Run all tests
async function runTests() {
  console.log('\n======== RUNNING API TESTS ========');
  
  // Authenticate with all roles
  const authSuccess = await authenticate();
  if (!authSuccess) return;
  
  // Test products
  const productId = await testGetProducts();
  const newProductId = await testCreateProduct();
  
  // Test orders
  let orderId = null;
  if (newProductId) {
    orderId = await testCreateOrder(newProductId);
  } else if (productId) {
    orderId = await testCreateOrder(productId);
  }
  
  // Get customer orders and potentially use that order ID if we didn't create one
  const customerOrderId = await testGetCustomerOrders();
  if (!orderId) {
    orderId = customerOrderId;
  }
  
  // Test admin operations
  await testGetAllOrders();
  
  if (orderId) {
    await testUpdateOrderStatus(orderId);
  }
  
  // Test rider operations
  const riderOrderId = await testGetRiderOrders();
  
  if (riderOrderId) {
    await testUpdateOrderStatusByRider(riderOrderId);
  }
  
  console.log('\n======== API TESTS COMPLETED ========');
}

// Run all tests
runTests(); 