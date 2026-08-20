import express from "express";
const router = express.Router();
import {
  createTestimonial,
  getTestimonialById,
  updateTestimonial,
  deleteTestimonial,
  listTestimonials,
  getAllActiveTestimonials,
} from "../../controllers/v1/testimonial.controller.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
import { ANY_ROLE } from "@demo-panel/shared/roles";

// Public endpoint for website
router.get("/public/testimonials", getAllActiveTestimonials);

// Admin protected endpoints
router.post("/testimonials", authMiddleware(ANY_ROLE), createTestimonial);
router.get("/testimonials", authMiddleware(ANY_ROLE), getAllActiveTestimonials);
router.post("/testimonials/search", authMiddleware(ANY_ROLE), listTestimonials);
router.get("/testimonials/:id", authMiddleware(ANY_ROLE), getTestimonialById);
router.put("/testimonials/:id", authMiddleware(ANY_ROLE), updateTestimonial);
router.delete("/testimonials/:id", authMiddleware(ANY_ROLE), deleteTestimonial);

export default router;
