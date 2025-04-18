# Fans & ACs E-commerce Backend

A RESTful API backend for an e-commerce platform specializing in fans and air conditioners.

## Features

- User authentication with Google OAuth
- Role-based access control (Admin, Customer, Rider)
- Product management with variants
- Order processing and tracking
- Rider assignment and delivery status updates

## Tech Stack

- Node.js & Express
- MongoDB with Mongoose
- JWT for authentication
- Google OAuth for user authentication

## Setup Instructions

1. Clone the repository
   ```
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   NODE_ENV=development
   PORT=5000
   MONGO_URI=<your-mongodb-connection-string>
   JWT_SECRET=<your-jwt-secret>
   GOOGLE_CLIENT_ID=<your-google-client-id>
   ```

4. Run the seed script to populate the database with sample data
   ```
   node seed.js
   ```

5. Start the server
   ```
   npm start
   ```
   
   For development with hot reload:
   ```
   npm run dev
   ```

## API Endpoints

### Authentication

- `POST /api/auth/google` - Authenticate with Google (mock or real)
- `GET /api/auth/me` - Get current user profile

### Products

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get a specific product
- `POST /api/products` - Create a product (Admin only)
- `PUT /api/products/:id` - Update a product (Admin only)
- `DELETE /api/products/:id` - Delete a product (Admin only)

### Orders

- `GET /api/orders` - Get all orders (Admin only)
- `GET /api/orders/my-orders` - Get customer's orders
- `GET /api/orders/rider-orders` - Get orders assigned to rider
- `GET /api/orders/:id` - Get a specific order
- `POST /api/orders` - Create a new order
- `PUT /api/orders/:id/status` - Update order status (Admin only)
- `PUT /api/orders/:id/rider-update` - Update order status (Rider only)

## Authentication Testing

For testing purposes, you can use the following approved emails:

- Admin: `admin@example.com` (role: admin)
- Customer: `customer@example.com` (role: customer)
- Riders: `rider1@example.com`, `rider2@example.com` (role: rider)

Use the mock token for authentication in development:

```javascript
const response = await axios.post('http://localhost:5000/api/auth/google', {
  tokenId: 'mock_token_id',
  email: 'admin@example.com' // or any other approved email
});

// The response will contain a JWT token
const token = response.data.token;

// Use this token in subsequent requests
axios.get('/api/some-endpoint', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

## License

MIT 