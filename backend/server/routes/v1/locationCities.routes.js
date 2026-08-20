import express from "express";
const router = express.Router();
import {
  createLocationCity,
  getLocationCityById,
  getLocationCityBySlug,
  updateLocationCity,
  deleteLocationCity,
  listLocationCities,
  getAllActiveLocationCities,
} from "../../controllers/v1/locationCity.controller.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
import { ANY_ROLE } from "@demo-panel/shared/roles";

// Public endpoints for website
router.get("/public/locations", getAllActiveLocationCities);
router.get("/public/locations/:slug", getLocationCityBySlug);

// Admin protected endpoints
router.post("/locations", authMiddleware(ANY_ROLE), createLocationCity);
router.get("/locations", authMiddleware(ANY_ROLE), getAllActiveLocationCities);
router.post("/locations/search", authMiddleware(ANY_ROLE), listLocationCities);
router.get("/locations/:id", authMiddleware(ANY_ROLE), getLocationCityById);
router.put("/locations/:id", authMiddleware(ANY_ROLE), updateLocationCity);
router.delete("/locations/:id", authMiddleware(ANY_ROLE), deleteLocationCity);

export default router;
