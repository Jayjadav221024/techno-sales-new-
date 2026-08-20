import express from "express";
const router = express.Router();
import {
  createInquiry,
  getInquiryById,
  updateInquiry,
  deleteInquiry,
  listInquiries,
} from "../../controllers/v1/inquiry.controller.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
import { ANY_ROLE } from "@demo-panel/shared/roles";

// Public endpoint for submitting RFQs and Contact inquiries from website
router.post("/public/inquiries", createInquiry);

// Admin protected endpoints
router.post("/inquiries", authMiddleware(ANY_ROLE), createInquiry);
router.post("/inquiries/search", authMiddleware(ANY_ROLE), listInquiries);
router.get("/inquiries/:id", authMiddleware(ANY_ROLE), getInquiryById);
router.put("/inquiries/:id", authMiddleware(ANY_ROLE), updateInquiry);
router.delete("/inquiries/:id", authMiddleware(ANY_ROLE), deleteInquiry);

export default router;
