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
