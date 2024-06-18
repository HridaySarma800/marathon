import { Sequelize, DataTypes } from "sequelize";
import config from "../config/index.js";
// Establish a new Sequelize instance to connect to the PostgreSQL database
// Connection URL format: postgres://<username>:<password>@<host>:<port>/<database_name>

const sequelize = new Sequelize(config.postgreSQLUrl, {
  dialect: "postgres",
});

// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected to marathon");
  })
  .catch((err) => {
    console.log("Error connecting to the  database:", err);
  });

// Initialize an empty object to hold our database-related objects
const db = {};

// Assign Sequelize and sequelize instance to the db object
db.Sequelize = Sequelize; // Sequelize library for further use (e.g., DataTypes)
db.sequelize = sequelize; // Sequelize instance for database connection

// Import and initialize the User model
// The userModel function is invoked with the sequelize instance and DataTypes as arguments
import createUserModel from "./userModel.js";
db.users = createUserModel(sequelize, DataTypes);
// Export the db object to be used in other parts of the application
export default db;
