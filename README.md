CoolBreeze - Fans & AC E-commerce Platform

A modern e-commerce platform for cooling products, featuring a responsive UI built with React and a robust Node.js backend.

-User Dashboard

![image](https://github.com/user-attachments/assets/c09c673e-11c2-4560-b757-73ccafcf9790)

![image](https://github.com/user-attachments/assets/7ce04aac-9523-495a-aba4-da1e3ef9d44a)

![image](https://github.com/user-attachments/assets/3caddc12-f8f0-4c0a-8682-788712a462f9)

![image](https://github.com/user-attachments/assets/698edd75-b029-492f-85fe-8a5cab4f84b5)

![image](https://github.com/user-attachments/assets/51fd6e92-44bc-46dc-982e-0ed5a29c0e77)

![image](https://github.com/user-attachments/assets/0f7b5319-fe00-470b-b2b1-81bd6030753c)

![image](https://github.com/user-attachments/assets/89c8133d-e1f3-4223-bd79-77cfc927cd9c)

-Admin Dashboard

![image](https://github.com/user-attachments/assets/f71314ff-0cbf-4bb2-8130-26270ad150a2)

![image](https://github.com/user-attachments/assets/4931f184-d297-4488-9d02-c36c9e466154)

![image](https://github.com/user-attachments/assets/e40513e4-4a5d-423c-ac23-2ee7eae98726)

-Rider Dashboard

![image](https://github.com/user-attachments/assets/df2be329-3938-4f06-bc05-6ba32e73db15)

![image](https://github.com/user-attachments/assets/57f16c15-a5b9-47a6-ae7e-46fe11951b40)

![image](https://github.com/user-attachments/assets/159fff3f-3939-4716-82ec-a085f23261c7)


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
- https://drive.google.com/file/d/1mVj2JhkOnsbf3oe-djhYZsAOlJ6xgByG/view?usp=sharing
