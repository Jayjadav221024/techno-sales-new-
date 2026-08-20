import express from "express";
const router = express.Router();
import {
  createCategory,
  getCategoryById,
  getCategoryBySlug,
  updateCategory,
  deleteCategory,
  listCategories,
  getAllActiveCategories,
} from "../../controllers/v1/category.controller.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
import { ANY_ROLE } from "@demo-panel/shared/roles";

// Public endpoints for website
router.get("/public/categories", getAllActiveCategories);
router.get("/public/categories/:slug", getCategoryBySlug);

// Admin protected endpoints
router.post("/categories", authMiddleware(ANY_ROLE), createCategory);
router.get("/categories", authMiddleware(ANY_ROLE), getAllActiveCategories);
router.post("/categories/search", authMiddleware(ANY_ROLE), listCategories);
router.get("/categories/:id", authMiddleware(ANY_ROLE), getCategoryById);
router.put("/categories/:id", authMiddleware(ANY_ROLE), updateCategory);
router.delete("/categories/:id", authMiddleware(ANY_ROLE), deleteCategory);

export default router;
