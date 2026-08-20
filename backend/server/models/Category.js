import mongoose from "mongoose";
import { imageAltField, seoFields } from "./seo.js";

const SubcategorySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    desc: { type: String, trim: true },
  },
  { _id: false }
);

const CategoryFaqSchema = new mongoose.Schema(
  {
    q: { type: String, required: true, trim: true },
    a: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true, unique: true },
    navLabel: { type: String, trim: true },
    title: { type: String, trim: true },
    tagline: { type: String, trim: true },
    image: { type: String, trim: true },
    blurb: { type: String, trim: true },
    longIntro: [{ type: String, trim: true }],
    subcategories: [SubcategorySchema],
    faqs: [CategoryFaqSchema],
    sequence: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    ...imageAltField,
    ...seoFields,
  },
  { timestamps: true }
);

CategorySchema.index({ slug: 1, isDeleted: 1 });
CategorySchema.index({ name: 1, isDeleted: 1 });

const Category = mongoose.model("Category", CategorySchema);
export default Category;
