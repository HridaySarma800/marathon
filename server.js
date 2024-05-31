const express = require('express');
const sequelize = require('sequelize');  // Import Sequelize for database operations
const dotenv = require('dotenv').config();  // Load environment variables from .env file
const cookieParser = require('cookie-parser');  // Middleware to parse cookies
const authRoutes = require('./routes/authRoutes');

// Setup Port
const PORT = process.env.PORT || 8082;  // Define the port to run the server, using environment variable or default to 8082

// Assign app to
const app = express();  // Initialize the Express application

// Middleware setup
app.use(express.json());  // Middleware to parse JSON bodies from incoming requests
app.use(express.urlencoded({ extended: true }));  // Middleware to parse URL-encoded bodies
app.use(cookieParser());  // Middleware to parse cookies from the request headers
app.use('/',authRoutes);

// Start the server and listen on the specified port
app.listen(PORT, () => console.log(`Server is connected on ${PORT}`));  // Log message confirming the server is running
