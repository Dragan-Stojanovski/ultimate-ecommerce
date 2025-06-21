const express = require("express");
const router = express.Router();
const {
  createCategory,
  getCategories,
  deleteCategory,
} = require("./controllers/nav-categories/navCategoriesController");

const { register, login } = require("./controllers/users/authController");
const { getUserOwnData, getAllUsers } = require("./controllers/users/userController");
const authenticateToken = require("./services/middlewares/authenticateToken");

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
router.post("/products/list", getAllProducts);
router.get("/products/:id", getProductById);
router.patch("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);

router.post("/register", register);
router.post("/login", login);
router.get("/userown", authenticateToken, getUserOwnData);
router.post("/get-users", getAllUsers);

module.exports = router;
