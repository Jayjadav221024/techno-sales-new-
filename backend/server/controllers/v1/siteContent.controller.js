import SiteContent from "../../models/SiteContent.js";

/**
 * Section keys come from the frontend registry and are used as a document _key_,
 * so they are constrained rather than trusted: lowercase segments joined by
 * dots, e.g. "home.hero" or "global.company".
 */
const KEY_PATTERN = /^[a-z0-9]+(?:[-_][a-z0-9]+)*(?:\.[a-z0-9]+(?:[-_][a-z0-9]+)*)+$/;

const isValidKey = (key) => typeof key === "string" && key.length <= 120 && KEY_PATTERN.test(key);

/** Content is arbitrary per section, but it must be a plain JSON object. */
const isPlainContent = (value) =>
  value !== null && typeof value === "object" && !Array.isArray(value);

const editorName = (req) => req.session?.user?.name || req.session?.user?.email || "admin";

/** Shapes a document into { key: content } for the website to consume. */
const toContentMap = (docs, field) =>
  docs.reduce((acc, doc) => {
    const value = field === "draft" ? (doc.hasDraft ? doc.draft : doc.published) : doc.published;
    if (value) acc[doc.key] = value;
    return acc;
  }, {});

/**
 * Published content for the live website. Public, unauthenticated.
 * Returns a flat { "home.hero": {...} } map so the client merges in one pass.
 */
export const getPublishedSiteContent = async (req, res) => {
  try {
    const docs = await SiteContent.find({ published: { $ne: null } }).select("key published hasDraft draft");
    res.status(200).json({ isOk: true, data: toContentMap(docs, "published") });
  } catch (error) {
    console.error("Error fetching published site content:", error);
    res.status(500).json({ isOk: false, message: "Failed to fetch site content", error: error.message });
  }
};

/**
 * Draft content for the admin's preview pane: the draft where one exists,
 * otherwise what is live. Behind auth so unpublished copy stays private.
 */
export const getDraftSiteContent = async (req, res) => {
  try {
    const docs = await SiteContent.find({}).select("key published hasDraft draft");
    res.status(200).json({ isOk: true, data: toContentMap(docs, "draft") });
  } catch (error) {
    console.error("Error fetching draft site content:", error);
    res.status(500).json({ isOk: false, message: "Failed to fetch draft content", error: error.message });
  }
};

/** Every section row, for the editor's status list. */
export const listSiteContent = async (req, res) => {
  try {
    const docs = await SiteContent.find({}).sort({ page: 1, key: 1 });
    res.status(200).json({ isOk: true, data: docs });
  } catch (error) {
    console.error("Error listing site content:", error);
    res.status(500).json({ isOk: false, message: "Failed to list site content", error: error.message });
  }
};

/** Saves an edit as a draft. Does not touch what is live. */
export const saveSiteContentDraft = async (req, res) => {
  try {
    const { key } = req.params;
    const { page, content } = req.body;

    if (!isValidKey(key)) {
      return res.status(400).json({ isOk: false, message: "Invalid section key" });
    }
    if (!isPlainContent(content)) {
      return res.status(400).json({ isOk: false, message: "Section content must be an object" });
    }
    if (!page || typeof page !== "string") {
      return res.status(400).json({ isOk: false, message: "Section page is required" });
    }

    const doc = await SiteContent.findOneAndUpdate(
      { key },
      {
        key,
        page,
        draft: content,
        hasDraft: true,
        updatedBy: editorName(req),
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.status(200).json({ isOk: true, data: doc, message: "Draft saved" });
  } catch (error) {
    console.error("Error saving site content draft:", error);
    res.status(500).json({ isOk: false, message: "Failed to save draft", error: error.message });
  }
};

/** Promotes a section's draft to live. */
export const publishSiteContent = async (req, res) => {
  try {
    const { key } = req.params;
    if (!isValidKey(key)) {
      return res.status(400).json({ isOk: false, message: "Invalid section key" });
    }

    const doc = await SiteContent.findOne({ key });
    if (!doc) return res.status(404).json({ isOk: false, message: "Section not found" });
    if (!doc.hasDraft) {
      return res.status(400).json({ isOk: false, message: "This section has no unpublished changes" });
    }

    doc.published = doc.draft;
    doc.draft = null;
    doc.hasDraft = false;
    doc.publishedAt = new Date();
    doc.publishedBy = editorName(req);
    await doc.save();

    res.status(200).json({ isOk: true, data: doc, message: "Section published" });
  } catch (error) {
    console.error("Error publishing site content:", error);
    res.status(500).json({ isOk: false, message: "Failed to publish section", error: error.message });
  }
};

/** Publishes every pending draft in one go. */
export const publishAllSiteContent = async (req, res) => {
  try {
    const pending = await SiteContent.find({ hasDraft: true });
    const by = editorName(req);
    const now = new Date();

    for (const doc of pending) {
      doc.published = doc.draft;
      doc.draft = null;
      doc.hasDraft = false;
      doc.publishedAt = now;
      doc.publishedBy = by;
      await doc.save();
    }

    res.status(200).json({
      isOk: true,
      data: { published: pending.length },
      message: pending.length ? `Published ${pending.length} section${pending.length === 1 ? "" : "s"}` : "Nothing to publish",
    });
  } catch (error) {
    console.error("Error publishing all site content:", error);
    res.status(500).json({ isOk: false, message: "Failed to publish sections", error: error.message });
  }
};

/**
 * Throws away a pending draft. If the section has never been published, the
 * row goes too, so the site falls back to the wording built into the code.
 */
export const discardSiteContentDraft = async (req, res) => {
  try {
    const { key } = req.params;
    if (!isValidKey(key)) {
      return res.status(400).json({ isOk: false, message: "Invalid section key" });
    }

    const doc = await SiteContent.findOne({ key });
    if (!doc) return res.status(404).json({ isOk: false, message: "Section not found" });

    if (doc.published === null || doc.published === undefined) {
      await SiteContent.deleteOne({ _id: doc._id });
      return res.status(200).json({ isOk: true, data: null, message: "Draft discarded" });
    }

    doc.draft = null;
    doc.hasDraft = false;
    doc.updatedBy = editorName(req);
    await doc.save();

    res.status(200).json({ isOk: true, data: doc, message: "Draft discarded" });
  } catch (error) {
    console.error("Error discarding site content draft:", error);
    res.status(500).json({ isOk: false, message: "Failed to discard draft", error: error.message });
  }
};

/**
 * Reverts a section to the wording built into the code by removing its row
 * entirely - the editor's "reset to original".
 */
export const resetSiteContent = async (req, res) => {
  try {
    const { key } = req.params;
    if (!isValidKey(key)) {
      return res.status(400).json({ isOk: false, message: "Invalid section key" });
    }
    await SiteContent.deleteOne({ key });
    res.status(200).json({ isOk: true, data: null, message: "Section reset to its original wording" });
  } catch (error) {
    console.error("Error resetting site content:", error);
    res.status(500).json({ isOk: false, message: "Failed to reset section", error: error.message });
  }
};
