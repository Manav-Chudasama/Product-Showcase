# **Product Showcase - Thrift Store**

## **Overview**

**Product Showcase** is a **MERN** (MongoDB, Express, React, Node.js) stack-based application designed to manage and showcase thrift products. It provides functionality to create, update, and display thrift products with support for image upload and storage. The application also supports CRUD (Create, Read, Update, Delete) operations for products and manages product images effectively by updating or replacing images as needed.

This project also includes **Clerk authentication**, enabling secure user sign-in and sign-up for enhanced application security.

### **Features**

- Clerk Authentication for secure user management.
- Add, Update, and Delete Thrift Products.
- Upload and manage product images.
- Auto-delete old images when updating with new ones.
- API-driven backend built with Node.js and Express.
- Uses MongoDB as the database to store product information.
- Image handling using Multer for efficient file management.
  
## **Table of Contents**

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)

---

## **Installation**

Follow the steps below to set up and run the project locally.

### **Prerequisites**

Make sure you have the following installed:

- [Node.js](https://nodejs.org/en/) (v12+)
- [MongoDB](https://www.mongodb.com/)
- A package manager (e.g. `npm` or `yarn`)
- [Clerk](https://clerk.dev) account for authentication

### **Steps to Install**

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your-username/Product-Showcase.git
   ```

2. **Navigate into the Project Directory:**

   ```bash
   cd Product-Showcase
   ```

3. **Install Dependencies:**

   ```bash
   cd Client
   npm install
   ```

   ```bash
   cd Server
   npm install
   ```
   
4. **Set up Environment Variables:**

   Create a `.env` file in the root directory and add your configuration:
  - Server variables

   ```bash
   PORT=5000
   MONGO_URI=<your-mongodb-connection-string>
   CREATE_USER=<your-clerk-webhook-key>
   UPDATE_USER=<your-clerk-webhook-key>
   DELETE_USER=<your-clerk-webhook-key>
   ```
  - Client variables

  ```bash
VITE_CLERK_PUBLISHABLE_KEY=<your-clerk-publishable-key>
  ``` 


5. **Start MongoDB** (if running locally):

   Make sure MongoDB is up and running before starting the server. If you're using a local instance:

   ```bash
   mongod
   ```

6. **Run the Server:**

   Start the backend server:

   ```bash
   cd Server
   npm run start
   ```

  Start the Frontend server:

   ```bash
   cd Client
   npm run start
   ```

## **Usage**

Once the project is set up, you can use the following functionalities:

### **Product Creation**

- You can create a new product by providing necessary details like `title`, `description`, `category`, `price`, and images.

### **Product Update**

- You can update existing product information and replace the associated images. The existing images will be deleted from the server before the new images are uploaded.

### **Product Deletion**

- You can remove a product from the database and delete its associated images from the server.


## **Technologies Used**

- **Frontend**:
  - React (if included in the project)

- **Backend**:
  - Node.js
  - Express.js

- **Database**:
  - MongoDB

- **File Upload**:
  - Multer (for handling product images)
