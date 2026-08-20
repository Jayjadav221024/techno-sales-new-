import mongoose from "mongoose";

const FaqSchema = new mongoose.Schema(
  {
    question: { type: String, required: true, trim: true },
    answer: { type: String, required: true, trim: true },
    category: { type: String, default: "General", trim: true },
    sequence: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

FaqSchema.index({ category: 1, isDeleted: 1 });

const Faq = mongoose.model("Faq", FaqSchema);
export default Faq;
