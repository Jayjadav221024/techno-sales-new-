import express from "express";
const router = express.Router();
import {
  createProduct,
  getProductById,
  getProductBySlug,
  updateProduct,
  deleteProduct,
  listProducts,
  getAllActiveProducts,
} from "../../controllers/v1/product.controller.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
import { ANY_ROLE } from "@demo-panel/shared/roles";

// Public endpoints for website
router.get("/public/products", getAllActiveProducts);
router.get("/public/products/:slug", getProductBySlug);

// Admin protected endpoints
router.post("/products", authMiddleware(ANY_ROLE), createProduct);
router.get("/products", authMiddleware(ANY_ROLE), getAllActiveProducts);
router.post("/products/search", authMiddleware(ANY_ROLE), listProducts);
router.get("/products/:id", authMiddleware(ANY_ROLE), getProductById);
router.put("/products/:id", authMiddleware(ANY_ROLE), updateProduct);
router.delete("/products/:id", authMiddleware(ANY_ROLE), deleteProduct);

export default router;
