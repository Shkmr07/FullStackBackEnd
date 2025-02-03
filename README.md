# Product Management API (Backend)

This is the backend of a product management application built with Node.js, Express, MongoDB, JWT-based authentication, and image upload functionality using Cloudinary. It includes user registration, login, product management with CRUD functionality, and token blacklisting for added security.

## Features

- **Product Management**: 
  - Create, Read, Update, Delete products.
  - Public access to view products.
  - Only authenticated users can create, update, or delete their products.

- **Authentication and Authorization**: 
  - User registration and login with JWT-based authentication.
  - Token blacklisting to prevent using revoked or expired tokens.
  - Refresh token support to renew access tokens.

- **Cloudinary Integration**:
  - Upload product images to Cloudinary and store image URLs in the database.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Shkmr07/FullStackBackEnd.git

## API Endpoints

### Authentication

#### 1. User Registration
- **POST /api/auth/signup**
  - Register a new user with hashed passwords.
  - **Request Body**: 
    - `name`: User's name
    - `email`: User's email address
    - `password`: User's password
  - **Response**:
    - `200 OK`: User registered successfully.
    - `400 Bad Request`: Invalid data or missing fields.
    - `500 Internal Server Error`: Server error.

#### 2. User Login
- **POST /api/auth/login**
  - Authenticate a user and return an access token and refresh token.
  - **Request Body**:
    - `email`: User's email address
    - `password`: User's password
  - **Response**:
    - `200 OK`: Returns access token and refresh token.
    - `401 Unauthorized`: Incorrect credentials.
    - `500 Internal Server Error`: Server error.

#### 3. Refresh Access Token
- **POST /api/auth/token**
  - Refresh the access token using the refresh token.
  - **Request Body**:
    - `refreshToken`: The refresh token
  - **Response**:
    - `200 OK`: Returns new access token.
    - `401 Unauthorized`: Invalid refresh token or token expired.
    - `500 Internal Server Error`: Server error.

### Product Management (Protected Routes)

#### 4. Get All Products
- **GET /api/products**
  - Fetch a list of all products (public access).
  - **Response**:
    - `200 OK`: Returns an array of all products.
    - `500 Internal Server Error`: Server error.

#### 5. Create a New Product
- **POST /api/products**
  - Create a new product. This route is protected and requires authentication.
  - **Request Body**:
    - `name`: Product name
    - `description`: Product description
    - `price`: Product price
    - `image`: URL of the image (uploaded via Cloudinary)
  - **Response**:
    - `201 Created`: Product created successfully.
    - `401 Unauthorized`: Missing or invalid token.
    - `400 Bad Request`: Missing required fields or invalid data.
    - `500 Internal Server Error`: Server error.

#### 6. Update an Existing Product
- **PUT /api/products/:id**
  - Update an existing product by ID. Only accessible by the user who created the product.
  - **Request Body**:
    - `name`: Product name
    - `description`: Product description
    - `price`: Product price
    - `image`: URL of the image (optional)
  - **Response**:
    - `200 OK`: Product updated successfully.
    - `401 Unauthorized`: Missing or invalid token, or unauthorized user.
    - `404 Not Found`: Product with specified ID not found.
    - `500 Internal Server Error`: Server error.

#### 7. Delete a Product
- **DELETE /api/products/:id**
  - Delete a product by ID. This route is protected and can only be accessed by the user who created the product.
  - **Response**:
    - `200 OK`: Product deleted successfully.
    - `401 Unauthorized`: Missing or invalid token, or unauthorized user.
    - `404 Not Found`: Product with specified ID not found.
    - `500 Internal Server Error`: Server error.
