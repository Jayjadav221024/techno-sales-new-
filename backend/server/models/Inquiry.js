import mongoose from "mongoose";

const InquirySchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["rfq", "contact_inquiry", "quote_request"],
      default: "contact_inquiry",
    },
    name: { type: String, required: true, trim: true },
    company: { type: String, trim: true },
    email: { type: String, trim: true },
    phone: { type: String, required: true, trim: true },
    category: { type: String, trim: true },
    productName: { type: String, trim: true },
    quantity: { type: Number, default: 1 },
    timeline: { type: String, trim: true },
    details: { type: String, trim: true },
    status: {
      type: String,
      enum: ["New", "In Review", "Quoted", "Closed", "Rejected"],
      default: "New",
    },
    notes: { type: String, trim: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

InquirySchema.index({ type: 1, isDeleted: 1 });
InquirySchema.index({ status: 1, isDeleted: 1 });
InquirySchema.index({ phone: 1, isDeleted: 1 });

const Inquiry = mongoose.model("Inquiry", InquirySchema);
export default Inquiry;
