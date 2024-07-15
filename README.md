# E-commerce-nextjs


E-Commerce Platform
This project is an e-commerce platform where users can browse products, add them to their cart, and proceed to checkout. Additionally, users can register as sellers by logging in, after which they will be redirected to a seller dashboard to manage their products.

Features
Browse products
Add products to the cart
User authentication (signup and login)
Seller dashboard for product management
Setup and Installation
Prerequisites
Node.js
PostgreSQL
Database Setup
Create a PostgreSQL database.
Run the following SQL commands to set up the necessary tables:

Usage
Browsing Products
Visit the homepage to see a list of available products.
Click on any product to view its details.
Adding Products to the Cart
On the product details page, click the "Add to Cart" button.
You can view your cart by clicking the cart icon in the navbar.
User Authentication
Signup
Go to the signup page by clicking "Signup" in the navbar.
Fill in your details and submit the form.
Upon successful signup, you will be logged in automatically.
Login
Go to the login page by clicking "Login" in the navbar.
Enter your credentials and submit the form.
Upon successful login, you will be redirected to the seller dashboard if you are registered as a seller.
Becoming a Seller
After logging in, visit the seller dashboard to manage your products.
From the seller dashboard, you can add new products, update existing products, and view your sales.
API Endpoints
User Authentication
POST /api/signup - Create a new user account.
POST /api/login - Authenticate a user and return a JWT.
Product Management
GET /api/products - Retrieve a list of all products.
POST /api/products - Add a new product (seller only).
Cart Management
POST /api/cart - Add a product to the cart.
GET /api/cart - Retrieve the current user's cart.

