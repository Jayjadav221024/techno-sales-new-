import express from "express";
const router = express.Router();
import {
  createBlogPost,
  getBlogPostById,
  getBlogPostBySlug,
  updateBlogPost,
  deleteBlogPost,
  listBlogPosts,
  getAllActiveBlogPosts,
} from "../../controllers/v1/blogPost.controller.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
import { ANY_ROLE } from "@demo-panel/shared/roles";

// Public endpoints for website
router.get("/public/blogs", getAllActiveBlogPosts);
router.get("/public/blogs/:slug", getBlogPostBySlug);

// Admin protected endpoints
router.post("/blogs", authMiddleware(ANY_ROLE), createBlogPost);
router.get("/blogs", authMiddleware(ANY_ROLE), getAllActiveBlogPosts);
router.post("/blogs/search", authMiddleware(ANY_ROLE), listBlogPosts);
router.get("/blogs/:id", authMiddleware(ANY_ROLE), getBlogPostById);
router.put("/blogs/:id", authMiddleware(ANY_ROLE), updateBlogPost);
router.delete("/blogs/:id", authMiddleware(ANY_ROLE), deleteBlogPost);

export default router;
