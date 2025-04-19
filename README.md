CoolBreeze - Fans & AC E-commerce Platform

A modern e-commerce platform for cooling products, featuring a responsive UI built with React and a robust Node.js backend.

![image](https://github.com/user-attachments/assets/89c8133d-e1f3-4223-bd79-77cfc927cd9c)



 Architecture

 Frontend

- Technologies: React, React Router, Tailwind CSS, React Icons
- Key Features:
  - Responsive design for all device sizes
  - Product catalog with filtering options
  - Detailed product pages with color and size selection
  - Shopping cart functionality
  - User authentication (customer, admin, rider roles)
  - Admin dashboard for order and product management
  - Rider portal for delivery management

 Backend

- Technologies: Node.js, Express, MongoDB, JWT
- Key Features:
  - RESTful API architecture
  - User authentication and authorization
  - Product management endpoints
  - Order processing and management
  - Rider assignment and tracking
  - Fallback to mock data for development

 Getting Started

 Backend Setup

1. Navigate to the `backend` directory
2. Install dependencies: `npm install`
3. Create a `.env` file with MongoDB connection string
4. Start the server: `npm start` or `npm run dev`

 Frontend Setup

1. Navigate to the `frontend` directory
2. Install dependencies: `npm install`
3. Start the development server: `npm start`

 API Endpoints

- Auth: `/api/auth` - Login, register, and verification
- Products: `/api/products` - Product CRUD operations
- Orders: `/api/orders` - Order management
- Users: `/api/users` - User profile management
- Riders: `/api/riders` - Delivery personnel management

User Roles

- Customer: Browse products, place orders, track deliveries
- Admin: Manage products, view all orders, assign riders
- Rider: Manage assigned deliveries, update delivery status

- Demo Video link
- 
