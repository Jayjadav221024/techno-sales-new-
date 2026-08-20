import mongoose from "mongoose";

/**
 * Editable copy for the website's static sections, one document per section.
 *
 * This collection holds *overrides only*. The section list, its field types and
 * its current wording all live in the frontend, in src/data/sections.js - so a
 * section with no row here still renders exactly the text it renders today, and
 * a row that is deleted reverts to that text rather than blanking the page.
 * Nothing needs seeding for the site to keep working.
 *
 * `draft` and `published` are deliberately separate. Whoever is editing may not
 * be the person who signs off on the wording, so saving is not publishing:
 * `draft` is what the editor sees in preview, `published` is what the public
 * sees. Both are Mixed because each section has its own shape - a hero has a
 * heading and a subtitle, an industries grid has an array of cards.
 */
const SiteContentSchema = new mongoose.Schema(
  {
    // Matches a key in the frontend section registry, e.g. "home.hero".
    key: { type: String, required: true, trim: true, unique: true },
    // Page this section belongs to, for grouping in the editor. Denormalised
    // from the registry so admin list queries don't need it loaded.
    page: { type: String, required: true, trim: true },

    published: { type: mongoose.Schema.Types.Mixed, default: null },
    draft: { type: mongoose.Schema.Types.Mixed, default: null },
    // Mongoose cannot reliably detect changes inside a Mixed path, so the
    // presence of a draft is tracked explicitly rather than inferred.
    hasDraft: { type: Boolean, default: false },

    publishedAt: { type: Date, default: null },
    publishedBy: { type: String, trim: true },
    updatedBy: { type: String, trim: true },
  },
  { timestamps: true }
);

SiteContentSchema.index({ page: 1, isDeleted: 1 });

const SiteContent = mongoose.model("SiteContent", SiteContentSchema);
export default SiteContent;
