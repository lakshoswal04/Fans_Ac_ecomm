const axios = require('axios');

// Function to test authentication
async function testAuth() {
  try {
    const response = await axios.post('http://localhost:5000/api/auth/google', {
      tokenId: 'mock_token_id',
      email: 'admin@example.com'
    });

    console.log('Authentication successful!');
    console.log('Token:', response.data.token);
    console.log('User:', response.data.user);
  } catch (error) {
    console.error('Authentication failed:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    } else {
      console.error(error.message);
    }
  }
}

// Run the test
testAuth(); 