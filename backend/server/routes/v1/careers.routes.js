import express from "express";
const router = express.Router();
import {
  createJobOpening,
  getJobOpeningById,
  updateJobOpening,
  deleteJobOpening,
  listJobOpenings,
  getAllActiveJobOpenings,
} from "../../controllers/v1/jobOpening.controller.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
import { ANY_ROLE } from "@demo-panel/shared/roles";

// Public endpoint for website
router.get("/public/careers", getAllActiveJobOpenings);

// Admin protected endpoints
router.post("/careers", authMiddleware(ANY_ROLE), createJobOpening);
router.get("/careers", authMiddleware(ANY_ROLE), getAllActiveJobOpenings);
router.post("/careers/search", authMiddleware(ANY_ROLE), listJobOpenings);
router.get("/careers/:id", authMiddleware(ANY_ROLE), getJobOpeningById);
router.put("/careers/:id", authMiddleware(ANY_ROLE), updateJobOpening);
router.delete("/careers/:id", authMiddleware(ANY_ROLE), deleteJobOpening);

export default router;
