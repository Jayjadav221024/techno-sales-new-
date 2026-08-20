import mongoose from "mongoose";
import { seoFields } from "./seo.js";

const LocationCitySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true, unique: true },
    district: { type: String, required: true, trim: true },
    title: { type: String, trim: true },
    desc: { type: String, trim: true },
    distance: { type: String, trim: true },
    zones: { type: String, trim: true },
    phone: { type: String, trim: true },
    phoneHref: { type: String, trim: true },
    sequence: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    // No imageAlt: LocationCity has no image field of its own.
    ...seoFields,
  },
  { timestamps: true }
);

LocationCitySchema.index({ slug: 1, isDeleted: 1 });
LocationCitySchema.index({ name: 1, isDeleted: 1 });

const LocationCity = mongoose.model("LocationCity", LocationCitySchema);
export default LocationCity;
