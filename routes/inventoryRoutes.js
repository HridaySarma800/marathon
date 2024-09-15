import express from "express";
const router = express.Router();
import authorize from "../middleware/auth.js";
import inventoryController from "../controllers/inventoryController.js";
import Roles from "../middleware/auth.js";


const {
  getProductById,
  getProductsByCategoryId,
  getProductsBySubCategoryId,
  addProduct,
  editProduct,
  deleteProduct,
  getAllCategories,
  getCategory,
  addCategory,
  editCategory,
  deleteCategory,
  getSubCategoryById,
  getSubCategoriesByCategoryId,
  addSubCategory,
  editSubCategory,
  deleteSubCategory,
} = inventoryController;


// Product Routes
router.get("/product/:id", authorize([Roles.Director, Roles.Admin]), getProductById);
router.get("/products/category/:categoryId", authorize([Roles.Director, Roles.Admin]), getProductsByCategoryId);
router.get("/products/subCategory/:subCategoryId", authorize([Roles.Director, Roles.Admin]), getProductsBySubCategoryId);
router.post("/addProduct", authorize([Roles.Director, Roles.Admin]), addProduct);
router.put("/product/:id", authorize([Roles.Director, Roles.Admin]), editProduct);
router.delete("/product/:id", authorize([Roles.Director, Roles.Admin]), deleteProduct);

// Category Routes
router.get("/allCategories",authorize([Roles.Director,Roles.Admin]),getAllCategories);
router.get("/category/:id", authorize([Roles.Director, Roles.Admin]), getCategory);
router.post("/addCategory", authorize([Roles.Director, Roles.Admin]), addCategory);
router.put("/category/:id", authorize([Roles.Director, Roles.Admin]), editCategory);
router.delete("/category/:id", authorize([Roles.Director, Roles.Admin]), deleteCategory);

// Sub-category Routes
router.get("/subCategory/:id", authorize([Roles.Director, Roles.Admin]), getSubCategoryById);
router.get("/subCategories/category/:categoryId", authorize([Roles.Director, Roles.Admin]), getSubCategoriesByCategoryId); // Add this line
router.post("/addSubCategory", authorize([Roles.Director, Roles.Admin]), addSubCategory);
router.put("/subCategory/:id", authorize([Roles.Director, Roles.Admin]), editSubCategory);
router.delete("/subCategory/:id", authorize([Roles.Director, Roles.Admin]), deleteSubCategory);

export default router;
