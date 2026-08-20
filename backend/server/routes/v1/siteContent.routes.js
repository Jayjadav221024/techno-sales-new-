import express from "express";
const router = express.Router();
import {
  getPublishedSiteContent,
  getDraftSiteContent,
  listSiteContent,
  saveSiteContentDraft,
  publishSiteContent,
  publishAllSiteContent,
  discardSiteContentDraft,
  resetSiteContent,
} from "../../controllers/v1/siteContent.controller.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
import { ANY_ROLE } from "@demo-panel/shared/roles";

// Public: what the live website renders.
router.get("/public/site-content", getPublishedSiteContent);

// Admin. The draft feed is behind auth so unpublished wording stays private
// until someone presses Publish.
router.get("/site-content/draft", authMiddleware(ANY_ROLE), getDraftSiteContent);
router.get("/site-content", authMiddleware(ANY_ROLE), listSiteContent);
router.post("/site-content/publish-all", authMiddleware(ANY_ROLE), publishAllSiteContent);
router.put("/site-content/:key", authMiddleware(ANY_ROLE), saveSiteContentDraft);
router.post("/site-content/:key/publish", authMiddleware(ANY_ROLE), publishSiteContent);
router.post("/site-content/:key/discard", authMiddleware(ANY_ROLE), discardSiteContentDraft);
router.delete("/site-content/:key", authMiddleware(ANY_ROLE), resetSiteContent);

export default router;
