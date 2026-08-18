import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  brand: { type: String, required: true },
  specBadge: { type: String },
  specs: [String],
  desc: { type: String },
  image: { type: String },
  icon: { type: String },
  intro: [String],
  applications: [String],
  whyChoose: [String],
  faqs: [{
    q: String,
    a: String
  }]
}, { timestamps: true });

const BlogPostSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  excerpt: { type: String },
  date: { type: String },
  body: { type: String, required: true },
  topic: { type: String },
  icon: { type: String }
}, { timestamps: true });

const BlockSchema = new mongoose.Schema({
  id: { type: String, required: true },
  type: { type: String, required: true }, // 'hero' | 'features' | 'faq' | 'text' | 'contact'
  content: { type: mongoose.Schema.Types.Mixed, default: {} }
});

const PageSchema = new mongoose.Schema({
  path: { type: String, required: true, unique: true }, // e.g. '/', '/about'
  title: { type: String },
  description: { type: String },
  blocks: [BlockSchema]
}, { timestamps: true });

export const Product = mongoose.model('Product', ProductSchema);
export const BlogPost = mongoose.model('BlogPost', BlogPostSchema);
export const Page = mongoose.model('Page', PageSchema);
