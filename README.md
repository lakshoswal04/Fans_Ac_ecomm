# E-commerce Platform for Fans & ACs - Backend

This repository contains the backend implementation for an e-commerce platform selling fans and air conditioners with support for Google sign-in, an admin dashboard, and a rider app.

## Features

- User authentication with Google OAuth
- Role-based authorization (Admin, Customer, Rider)
- Product management with variants (colors and sizes)
- Order management with status tracking
- Admin dashboard for managing orders and assigning riders
- Rider functionality to update order delivery status

## Tech Stack

- Node.js with Express
- MongoDB for database
- JWT for authentication
- Google OAuth for user sign-in

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Google OAuth credentials (for production)

## Installation

1. Clone the repository:
```
git clone <repository-url>
cd backend
```

2. Install dependencies:
```
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/ecommerce-fans-acs
JWT_SECRET=your_jwt_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
```

## Running the Application

1. Start the development server:
```
npm run dev
```

2. Seed the database with sample data:
```
node config/seed.js
```

3. Generate mock tokens for API testing:
```
node config/mockSetup.js
```
This will output JWT tokens for each user role that you can use in Postman.

The server will run on http://localhost:5000 by default.

## API Endpoints

### Authentication
- `POST /api/auth/google` - Google sign-in/registration
- `GET /api/auth/me` - Get current user profile

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)

### Orders
- `POST /api/orders` - Create order (Customer only)
- `GET /api/orders` - Get all orders (Admin only)
- `GET /api/orders/my-orders` - Get customer's orders (Customer only)
- `GET /api/orders/rider-orders` - Get rider's assigned orders (Rider only)
- `GET /api/orders/:id` - Get single order (based on user role)
- `PUT /api/orders/:id/status` - Update order status (Admin only)
- `PUT /api/orders/:id/rider-update` - Update order status by rider (Rider only)

### Users
- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/riders` - Get all riders (Admin only)
- `GET /api/users/:id` - Get single user (Admin only)
- `PUT /api/users/:id` - Update user (Admin only)
- `DELETE /api/users/:id` - Delete user (Admin only)

### Approved Emails
- `GET /api/users/approved-emails` - Get all approved emails (Admin only)
- `POST /api/users/approved-emails` - Add approved email (Admin only)
- `DELETE /api/users/approved-emails/:id` - Delete approved email (Admin only)

## Testing APIs with Postman

1. **Import the Postman Collection**:
   - Download the Postman collection file from `docs/FansAC-Ecommerce.postman_collection.json` (if available)
   - Or create a new collection in Postman

2. **Set up Environment Variables in Postman**:
   - Create a new environment with the following variables:
     - `baseUrl`: `http://localhost:5000/api`
     - `token`: (This will be filled after authentication)

3. **Authenticate and Get Token**:
   - Since the app uses Google OAuth, for testing purposes, you can use the pre-seeded users:
   - Admin: `admin@example.com`
   - Customer: `customer@example.com`
   - Rider: `rider1@example.com` or `rider2@example.com`
   - Make a request to: `POST /api/auth/google` with a mock token or directly get tokens from the seeded users

4. **Test Product APIs**:
   - Get all products: `GET /api/products`
   - Get single product: `GET /api/products/:id` (Use an ID from the previous response)
   - Create product (Admin): `POST /api/products` with product details in body
   - Update product (Admin): `PUT /api/products/:id` with updated details in body
   - Delete product (Admin): `DELETE /api/products/:id`

5. **Test Order APIs**:
   - Get all orders (Admin): `GET /api/orders`
   - Get customer orders: `GET /api/orders/my-orders` (Customer token required)
   - Get rider orders: `GET /api/orders/rider-orders` (Rider token required)
   - Create order (Customer): `POST /api/orders` with order details in body
   - Get single order: `GET /api/orders/:id` (Use an ID from the previous response)
   - Update order status (Admin): `PUT /api/orders/:id/status` with status details in body
   - Update order status (Rider): `PUT /api/orders/:id/rider-update` with status details in body (Rider token required)

6. **Test User APIs (Admin Only)**:
   - Get all users: `GET /api/users`
   - Get all riders: `GET /api/users/riders`
   - Get single user: `GET /api/users/:id` (Use an ID from the previous response)
   - Update user: `PUT /api/users/:id` with updated details in body
   - Delete user: `DELETE /api/users/:id`
   - Get approved emails: `GET /api/users/approved-emails`
   - Add approved email: `POST /api/users/approved-emails` with email details in body
   - Delete approved email: `DELETE /api/users/approved-emails/:id`

## Sample Request Bodies

### Create Product (POST /api/products)
```json
{
  "name": "Modern Ceiling Fan",
  "description": "Energy-efficient ceiling fan with remote control",
  "category": "fan",
  "price": 149.99,
  "variants": [
    {
      "color": "White",
      "size": "52 inch",
      "stock": 20,
      "sku": "FAN-M-W-52"
    },
    {
      "color": "Black",
      "size": "52 inch",
      "stock": 15,
      "sku": "FAN-M-B-52"
    }
  ],
  "imageUrl": "https://example.com/images/modern-fan.jpg",
  "brand": "CoolBreeze",
  "features": [
    "Remote Control",
    "Energy Efficient",
    "3 Speed Settings"
  ],
  "warranty": "2 years"
}
```

### Create Order (POST /api/orders)
```json
{
  "items": [
    {
      "product": "PRODUCT_ID_HERE",
      "color": "White",
      "size": "52 inch",
      "quantity": 1
    }
  ],
  "shippingAddress": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  },
  "phone": "555-123-4567",
  "paymentMethod": "credit_card"
}
```

### Update Order Status (Admin) (PUT /api/orders/:id/status)
```json
{
  "status": "shipped",
  "riderId": "RIDER_ID_HERE",
  "deliveryNotes": "Leave at front door"
}
```

### Update Order Status (Rider) (PUT /api/orders/:id/rider-update)
```json
{
  "status": "delivered",
  "deliveryNotes": "Delivered to customer"
}
```

### Add Approved Email (POST /api/users/approved-emails)
```json
{
  "email": "newuser@example.com",
  "role": "customer"
}
```

## License

This project is licensed under the MIT License. 