import GlobalResponse from "../models/global_response.js";
import db from "../models/index.js"; // Ensure this path is correct based on your project structure.

// Get Product
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await db.products.findOne({ where: { id } });

    if (product) {
      return res.status(200).send(new GlobalResponse(true, "Product retrieved successfully", product));
    }
    return res.status(404).send(new GlobalResponse(false, "Product not found", {}));
  } catch (err) {
    return res.status(500).send(new GlobalResponse(false, "Failed to retrieve product. " + err.message, {}));
  }
};

// Get Products by Category ID
const getProductsByCategoryId = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const products = await db.products.findAll({ where: { categoryId } });

    if (products.length > 0) {
      return res.status(200).send(new GlobalResponse(true, "Products retrieved successfully", products));
    }
    return res.status(404).send(new GlobalResponse(false, "No products found for this category", {}));
  } catch (err) {
    return res.status(500).send(new GlobalResponse(false, "Failed to retrieve products. " + err.message, {}));
  }
};

// Get Products by SubCategory ID
const getProductsBySubCategoryId = async (req, res) => {
  try {
    const { subCategoryId } = req.params;

    const products = await db.products.findAll({ where: { subCategoryId } });

    if (products.length > 0) {
      return res.status(200).send(new GlobalResponse(true, "Products retrieved successfully", products));
    }
    return res.status(404).send(new GlobalResponse(false, "No products found for this sub-category", {}));
  } catch (err) {
    return res.status(500).send(new GlobalResponse(false, "Failed to retrieve products. " + err.message, {}));
  }
};

// Add Product.
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      sku,
      categoryId,
      subCategoryId,
      images,
      mrp,
      sellingPrice,
      discountPercentage,
      price,
      stock,
      video,
    } = req.body;

    // Validate required fields
    if (!name || !sku || !categoryId || !subCategoryId || !mrp || !sellingPrice || !price || !stock) {
      return res
        .status(400)
        .send(new GlobalResponse(false, "Missing required fields", {}));
    }

    // Create a new product
    const newProduct = await db.products.create({
      name,
      description,
      sku,
      categoryId,
      subCategoryId,
      images,
      mrp,
      sellingPrice,
      discountPercentage,
      price,
      stock,
      video,
    });

    return res
      .status(201)
      .send(new GlobalResponse(true, "Product added successfully", newProduct));
  } catch (err) {
    return res
      .status(500)
      .send(new GlobalResponse(false, "Failed to add product. " + err.message, {}));
  }
};
  // Edit product
const editProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedData = req.body;
  
      const [updated] = await db.products.update(updatedData, {
        where: { id },
      });
  
      if (updated) {
        const updatedProduct = await db.products.findOne({ where: { id } });
        return res.status(200).send(new GlobalResponse(true, "Product updated successfully", updatedProduct));
      }
      throw new Error("Product not found");
    } catch (err) {
      return res.status(500).send(new GlobalResponse(false, "Failed to update product. " + err.message, {}));
    }
  };
  
  // Delete product
  const deleteProduct = async (req, res) => {
    try {
      const { id } = req.params;
  
      const deleted = await db.products.destroy({
        where: { id },
      });
  
      if (deleted) {
        return res.status(200).send(new GlobalResponse(true, "Product deleted successfully", {}));
      }
      throw new Error("Product not found");
    } catch (err) {
      return res.status(500).send(new GlobalResponse(false, "Failed to delete product. " + err.message, {}));
    }
  };


// Get Category
const getCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await db.categories.findOne({ where: { id } });

    if (category) {
      return res.status(200).send(new GlobalResponse(true, "Category retrieved successfully", category));
    }
    return res.status(404).send(new GlobalResponse(false, "Category not found", {}));
  } catch (err) {
    return res.status(500).send(new GlobalResponse(false, "Failed to retrieve category. " + err.message, {}));
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await db.categories.findAll();

    if (categories.length > 0) {
      return res.status(200).send(new GlobalResponse(true, "Categories retrieved successfully", categories));
    }
    return res.status(404).send(new GlobalResponse(false, "No categories found", {}));
  } catch (err) {
    return res.status(500).send(new GlobalResponse(false, "Failed to retrieve categories. " + err.message, {}));
  }
};
  
  // Add category
  const addCategory = async (req, res) => {
    try {
      const { name, description, imageUrl } = req.body;
  
      const newCategory = await db.categories.create({
        name,
        description,
        imageUrl,
      });
  
      return res.status(201).send(new GlobalResponse(true, "Category added successfully", newCategory));
    } catch (err) {
      return res.status(500).send(new GlobalResponse(false, "Failed to add category. " + err.message, {}));
    }
  };
  
  // Edit category
  const editCategory = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedData = req.body;
  
      const [updated] = await db.categories.update(updatedData, {
        where: { id },
      });
  
      if (updated) {
        const updatedCategory = await db.categories.findOne({ where: { id } });
        return res.status(200).send(new GlobalResponse(true, "Category updated successfully", updatedCategory));
      }
      throw new Error("Category not found");
    } catch (err) {
      return res.status(500).send(new GlobalResponse(false, "Failed to update category. " + err.message, {}));
    }
  };
  
  // Delete category
  const deleteCategory = async (req, res) => {
    try {
      const { id } = req.params;
  
      const deleted = await db.categories.destroy({
        where: { id },
      });
  
      if (deleted) {
        return res.status(200).send(new GlobalResponse(true, "Category deleted successfully", {}));
      }
      throw new Error("Category not found");
    } catch (err) {
      return res.status(500).send(new GlobalResponse(false, "Failed to delete category. " + err.message, {}));
    }
  };
  
// Get SubCategories by Category ID
const getSubCategoriesByCategoryId = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const subCategories = await db.subCategories.findAll({ where: { categoryId } });

    if (subCategories.length > 0) {
      return res.status(200).send(new GlobalResponse(true, "Sub-categories retrieved successfully", subCategories));
    }
    return res.status(404).send(new GlobalResponse(false, "No sub-categories found for this category", {}));
  } catch (err) {
    return res.status(500).send(new GlobalResponse(false, "Failed to retrieve sub-categories. " + err.message, {}));
  }
};


// Get SubCategory
const getSubCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const subCategory = await db.subCategories.findOne({ where: { id } });

    if (subCategory) {
      return res.status(200).send(new GlobalResponse(true, "Sub-category retrieved successfully", subCategory));
    }
    return res.status(404).send(new GlobalResponse(false, "Sub-category not found", {}));
  } catch (err) {
    return res.status(500).send(new GlobalResponse(false, "Failed to retrieve sub-category. " + err.message, {}));
  }
};

  // Add sub-category
  const addSubCategory = async (req, res) => {
    try {
      const { name, description, image, categoryId } = req.body;
  
      const newSubCategory = await db.subCategories.create({
        name,
        description,
        image,
        categoryId,
      });
  
      return res.status(201).send(new GlobalResponse(true, "Sub-category added successfully", newSubCategory));
    } catch (err) {
      return res.status(500).send(new GlobalResponse(false, "Failed to add sub-category. " + err.message, {}));
    }
  };
  
  // Edit sub-category
  const editSubCategory = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedData = req.body;
  
      const [updated] = await db.subCategories.update(updatedData, {
        where: { id },
      });
  
      if (updated) {
        const updatedSubCategory = await db.subCategories.findOne({ where: { id } });
        return res.status(200).send(new GlobalResponse(true, "Sub-category updated successfully", updatedSubCategory));
      }
      throw new Error("Sub-category not found");
    } catch (err) {
      return res.status(500).send(new GlobalResponse(false, "Failed to update sub-category. " + err.message, {}));
    }
  };
  
  // Delete sub-category
  const deleteSubCategory = async (req, res) => {
    try {
      const { id } = req.params;
  
      const deleted = await db.subCategories.destroy({
        where: { id },
      });
  
      if (deleted) {
        return res.status(200).send(new GlobalResponse(true, "Sub-category deleted successfully", {}));
      }
      throw new Error("Sub-category not found");
    } catch (err) {
      return res.status(500).send(new GlobalResponse(false, "Failed to delete sub-category. " + err.message, {}));
    }
  };
  
  const addToCart = async (req, res) => {
    try {
      const { userId, productId, quantity } = req.body;
  
      // Find the product details
      const product = await db.products.findOne({ where: { id: productId } });
  
      if (!product) {
        return res.status(404).send(new GlobalResponse(false, "Product not found", {}));
      }
  
      // Check if the cart exists for the user
      let cart = await db.carts.findOne({ where: { userId } });
  
      if (!cart) {
        // If the cart doesn't exist, create a new one
        cart = await db.carts.create({ userId });
      }
  
      // Check if the product already exists in the cart
      let cartItem = await db.cartItems.findOne({ where: { cartId: cart.id, productId } });
  
      if (cartItem) {
        // Update quantity if product is already in cart
        cartItem.quantity += quantity;
        await cartItem.save();
      } else {
        // Add new product to cart with product details
        cartItem = await db.cartItems.create({
          cartId: cart.id,
          productId,
          quantity,
          productName: product.name,
          productDescription: product.description,
          productPrice: product.price,
          productImage: product.images ? product.images[0] : null,
          productSku: product.sku,
        });
      }
  
      return res.status(201).send(new GlobalResponse(true, "Product added to cart successfully", cartItem));
    } catch (err) {
      return res.status(500).send(new GlobalResponse(false, "Failed to add product to cart. " + err.message, {}));
    }
  };
  

  export default {
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
  };