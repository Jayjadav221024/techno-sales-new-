import mongoose from "mongoose";

const BrandPartnerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    badge: { type: String, trim: true },
    badgeType: {
      type: String,
      enum: ["official", "certified", "direct", "supplier"],
      default: "official",
    },
    desc: { type: String, trim: true },
    lines: [{ type: String, trim: true }],
    logo: { type: String, trim: true },
    sequence: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

BrandPartnerSchema.index({ name: 1, isDeleted: 1 });

const BrandPartner = mongoose.model("BrandPartner", BrandPartnerSchema);
export default BrandPartner;
