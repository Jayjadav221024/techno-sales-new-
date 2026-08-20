import express from "express";
const router = express.Router();
import {
  createFaq,
  getFaqById,
  updateFaq,
  deleteFaq,
  listFaqs,
  getAllActiveFaqs,
} from "../../controllers/v1/faq.controller.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
import { ANY_ROLE } from "@demo-panel/shared/roles";

// Public endpoint for website
router.get("/public/faqs", getAllActiveFaqs);

// Admin protected endpoints
router.post("/faqs", authMiddleware(ANY_ROLE), createFaq);
router.get("/faqs", authMiddleware(ANY_ROLE), getAllActiveFaqs);
router.post("/faqs/search", authMiddleware(ANY_ROLE), listFaqs);
router.get("/faqs/:id", authMiddleware(ANY_ROLE), getFaqById);
router.put("/faqs/:id", authMiddleware(ANY_ROLE), updateFaq);
router.delete("/faqs/:id", authMiddleware(ANY_ROLE), deleteFaq);

export default router;
