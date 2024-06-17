import express, { json, urlencoded } from "express";
import cookieParser from "cookie-parser"; // Middleware to parse cookies
import authRoutes from "./routes/authRoutes.js";
import config from "./config/index.js";
import { errorHandler } from "./middleware/errorHandler.js";
// Assign app to
const app = express(); // Initialize the Express application

// Middleware setup
app.use(json()); // Middleware to parse JSON bodies from incoming requests
app.use(urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies
app.use(cookieParser()); // Middleware to parse cookies from the request headers
app.use(errorHandler);
app.use(`${config.appVersion}/auth`, authRoutes); // Start the server and listen on the specified port
app.listen(config.port, () =>
  console.log(`Server is connected on ${config.port}`)
); // Log message confirming the server is running
