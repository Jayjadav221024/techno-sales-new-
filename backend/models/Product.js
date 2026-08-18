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

export default mongoose.model('Product', ProductSchema);
