import mongoose from 'mongoose';

const BlockSchema = new mongoose.Schema({
  id: { type: String, required: true },
  type: { type: String, required: true },
  content: { type: mongoose.Schema.Types.Mixed, default: {} }
});

const PageSchema = new mongoose.Schema({
  path: { type: String, required: true, unique: true },
  title: { type: String },
  description: { type: String },
  blocks: [BlockSchema]
}, { timestamps: true });

export default mongoose.model('Page', PageSchema);
