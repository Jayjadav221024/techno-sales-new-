import mongoose from "mongoose";
import { imageAltField, seoFields } from "./seo.js";

const ProductFaqSchema = new mongoose.Schema(
  {
    q: { type: String, required: true, trim: true },
    a: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true, unique: true },
    categorySlug: { type: String, required: true, trim: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    brand: { type: String, required: true, trim: true },
    specBadge: { type: String, trim: true },
    specs: [{ type: String, trim: true }],
    desc: { type: String, trim: true },
    image: { type: String, trim: true },
    icon: { type: String, trim: true },
    intro: [{ type: String, trim: true }],
    applications: [{ type: String, trim: true }],
    whyChoose: [{ type: String, trim: true }],
    faqs: [ProductFaqSchema],
    sequence: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    ...imageAltField,
    ...seoFields,
  },
  { timestamps: true }
);

ProductSchema.index({ slug: 1, isDeleted: 1 });
ProductSchema.index({ categorySlug: 1, isDeleted: 1 });
ProductSchema.index({ brand: 1, isDeleted: 1 });

const Product = mongoose.model("Product", ProductSchema);
export default Product;
