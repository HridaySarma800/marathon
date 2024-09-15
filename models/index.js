import { Sequelize, DataTypes } from 'sequelize';
import config from '../config/index.js';
import createCategoryModel from './categoryModel.js';
import createSubCategoryModel from './subCategoryModel.js';
import createProductModel from './productModel.js';
import createCartItemModel from './cartItemModel.js';
import createUserModel from './userModel.js';

// Initialize Sequelize instance with PostgreSQL connection.
const sequelize = new Sequelize(config.postgreSQLUrl, {
  dialect: 'postgres',
});

// Test the database connection.
sequelize.authenticate()
  .then(() => {
    console.log('Database connected to marathon');
  })
  .catch((err) => {
    console.log('Error connecting to the database:', err);
  });

// Initialize an empty object to hold our database-related objects.
const db = {};

// Assign Sequelize and sequelize instance to the db object.
db.Sequelize = Sequelize; // Sequelize library for further use (e.g., DataTypes).
db.sequelize = sequelize; // Sequelize instance for database connection.

// Import and initialize the models.
db.users = createUserModel(sequelize, DataTypes);
db.categories = createCategoryModel(sequelize, DataTypes);
db.subCategories = createSubCategoryModel(sequelize, DataTypes);
db.products = createProductModel(sequelize, DataTypes);
db.cartItems = createCartItemModel(sequelize, DataTypes);

// Define relationships.
db.categories.hasMany(db.subCategories, {
  foreignKey: 'categoryId',
  sourceKey: 'id',
});

db.subCategories.belongsTo(db.categories, {
  foreignKey: 'categoryId',
  targetKey: 'id',
});

db.categories.hasMany(db.products, {
  foreignKey: 'categoryId',
  sourceKey: 'id',
});

db.products.belongsTo(db.categories, {
  foreignKey: 'categoryId',
  targetKey: 'id',
});

db.subCategories.hasMany(db.products, {
  foreignKey: 'subCategoryId',
  sourceKey: 'id',
});

db.products.belongsTo(db.subCategories, {
  foreignKey: 'subCategoryId',
  targetKey: 'id',
});

// Define relationships for CartItem
db.products.hasMany(db.cartItems, {
  foreignKey: 'productId',
  sourceKey: 'id',
});

db.cartItems.belongsTo(db.products, {
  foreignKey: 'productId',
  targetKey: 'id',
});

// Synchronize models with the database.
sequelize.sync()
  .then(() => {
    console.log('Models synchronized with the database');
  })
  .catch((err) => {
    console.log('Error synchronizing models with the database:', err);
  });

// Export the db object to be used in other parts of the application.
export default db;
