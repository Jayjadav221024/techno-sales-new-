import mongoose from 'mongoose';

const BlogPostSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  excerpt: { type: String },
  date: { type: String },
  body: { type: String, required: true },
  topic: { type: String },
  icon: { type: String }
}, { timestamps: true });

export default mongoose.model('BlogPost', BlogPostSchema);
