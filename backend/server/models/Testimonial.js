import mongoose from "mongoose";

const TestimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    initials: { type: String, trim: true },
    text: { type: String, required: true, trim: true },
    rating: { type: Number, default: 5 },
    sequence: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

TestimonialSchema.index({ name: 1, isDeleted: 1 });

const Testimonial = mongoose.model("Testimonial", TestimonialSchema);
export default Testimonial;
