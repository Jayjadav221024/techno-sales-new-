import mongoose from "mongoose";

const JobOpeningSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    department: { type: String, trim: true },
    location: { type: String, trim: true },
    employmentType: {
      type: String,
      enum: ["full-time", "part-time", "contract", "internship"],
      default: "full-time",
    },
    experience: { type: String, trim: true },
    openings: { type: Number, default: 1 },
    salaryRange: { type: String, trim: true },
    desc: { type: String, trim: true },
    responsibilities: [{ type: String, trim: true }],
    requirements: [{ type: String, trim: true }],
    applyEmail: { type: String, trim: true },
    sequence: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

JobOpeningSchema.index({ title: 1, isDeleted: 1 });

// The public /career page reads exactly this: active rows in display order.
JobOpeningSchema.index({ isActive: 1, sequence: 1 });

const JobOpening = mongoose.model("JobOpening", JobOpeningSchema);
export default JobOpening;
