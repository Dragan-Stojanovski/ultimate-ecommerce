const express = require("express");
const router = express.Router();
const {
  createCategory,
  getCategories,
  deleteCategory,
} = require("./controllers/nav-categories/navCategoriesController");

const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("./controllers/products/productController");

router.post("/nav-categories", createCategory);
router.get("/nav-categories", getCategories);
router.delete("/nav-categories/:id", deleteCategory);

router.post("/products", createProduct);
router.get("/products", getAllProducts);
router.get("/products/:id", getProductById);
router.put("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);

module.exports = router;
