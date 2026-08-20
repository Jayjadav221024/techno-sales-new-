import express from "express";
const router = express.Router();
import {
  createBrandPartner,
  getBrandPartnerById,
  updateBrandPartner,
  deleteBrandPartner,
  listBrandPartners,
  getAllActiveBrandPartners,
} from "../../controllers/v1/brandPartner.controller.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
import { ANY_ROLE } from "@demo-panel/shared/roles";

// Public endpoint for website
router.get("/public/brands", getAllActiveBrandPartners);

// Admin protected endpoints
router.post("/brands", authMiddleware(ANY_ROLE), createBrandPartner);
router.get("/brands", authMiddleware(ANY_ROLE), getAllActiveBrandPartners);
router.post("/brands/search", authMiddleware(ANY_ROLE), listBrandPartners);
router.get("/brands/:id", authMiddleware(ANY_ROLE), getBrandPartnerById);
router.put("/brands/:id", authMiddleware(ANY_ROLE), updateBrandPartner);
router.delete("/brands/:id", authMiddleware(ANY_ROLE), deleteBrandPartner);

export default router;
