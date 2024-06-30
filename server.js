import express, { json, urlencoded } from "express";
import cookieParser from "cookie-parser"; // Middleware to parse cookies
import authRoutes from "./routes/authRoutes.js";
import appRoutes from "./routes/appRoutes.js";
import config from "./config/index.js";
import { errorHandler } from "./middleware/errorHandler.js";

// Assign app to
const app = express(); // Initialize the Express application

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", [
    "test.bytesbeyond.in",
    "localhost:3000",
    "bytesbeyond.in",
  ]);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-credentials", true);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
  next();
});

// Middleware setup
app.use(json()); // Middleware to parse JSON bodies from incoming requests
app.use(urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies
app.use(cookieParser()); // Middleware to parse cookies from the request headers
app.use(`${config.appVersion}/auth`, authRoutes);
app.use(`${config.appVersion}/app`, appRoutes);
app.use(errorHandler);

app.listen(config.port, () =>
  console.log(`Server is connected on ${config.port}`)
); // Log message confirming the server is running
