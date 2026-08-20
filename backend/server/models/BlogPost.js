import mongoose from "mongoose";
import { imageAltField, seoFields } from "./seo.js";

const BlogPostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true, unique: true },
    topic: { type: String, default: "Motors", trim: true },
    excerpt: { type: String, required: true, trim: true },
    content: { type: String, default: "", trim: true },
    image: { type: String, trim: true },
    icon: { type: String, default: "cog", trim: true },
    publishDate: { type: String, trim: true },
    url: { type: String, trim: true },
    isActive: { type: Boolean, default: true },
    ...imageAltField,
    ...seoFields,
  },
  { timestamps: true }
);

BlogPostSchema.index({ slug: 1, isDeleted: 1 });
BlogPostSchema.index({ topic: 1, isDeleted: 1 });

const BlogPost = mongoose.model("BlogPost", BlogPostSchema);
export default BlogPost;
