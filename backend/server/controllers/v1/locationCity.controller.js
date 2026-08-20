import { runListQuery } from "../../utils/listQuery.js";
import LocationCity from "../../models/LocationCity.js";
import { pickSeo } from "../../models/seo.js";

const FILTERABLE = {
  name: "string",
  slug: "string",
  district: "string",
  isActive: "boolean",
  createdAt: "date",
};

export const createLocationCity = async (req, res) => {
  try {
    const { name, slug, district, title, desc, distance, zones, phone, phoneHref, sequence, isActive } = req.body;

    const existing = await LocationCity.findOne({ slug: slug.toLowerCase() });
    if (existing) {
      return res.status(400).json({ isOk: false, message: "Location with this slug already exists" });
    }

    const newDoc = new LocationCity({
      name,
      slug: slug.toLowerCase(),
      district,
      title,
      desc,
      distance,
      zones,
      phone,
      phoneHref,
      sequence: sequence || 0,
      isActive: isActive ?? true,
      ...pickSeo(req.body),
    });

    const saved = await newDoc.save();
    res.status(201).json({ isOk: true, data: saved, message: "Location city created successfully" });
  } catch (error) {
    console.error("Error creating location city:", error);
    res.status(500).json({ isOk: false, message: "Failed to create location city", error: error.message });
  }
};

export const getLocationCityById = async (req, res) => {
  try {
    const doc = await LocationCity.findById(req.params.id);
    if (!doc) return res.status(404).json({ isOk: false, message: "Location not found" });
    res.status(200).json({ isOk: true, data: doc });
  } catch (error) {
    res.status(500).json({ isOk: false, message: "Failed to fetch location", error: error.message });
  }
};

export const getLocationCityBySlug = async (req, res) => {
  try {
    const doc = await LocationCity.findOne({ slug: req.params.slug, isActive: true });
    if (!doc) return res.status(404).json({ isOk: false, message: "Location not found" });
    res.status(200).json({ isOk: true, data: doc });
  } catch (error) {
    res.status(500).json({ isOk: false, message: "Failed to fetch location", error: error.message });
  }
};

export const updateLocationCity = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, slug, district, title, desc, distance, zones, phone, phoneHref, sequence, isActive } = req.body;

    if (slug) {
      const existing = await LocationCity.findOne({ slug: slug.toLowerCase(), _id: { $ne: id } });
      if (existing) {
        return res.status(400).json({ isOk: false, message: "Location with this slug already exists" });
      }
    }

    const updated = await LocationCity.findByIdAndUpdate(
      id,
      {
        name,
        slug: slug ? slug.toLowerCase() : undefined,
        district,
        title,
        desc,
        distance,
        zones,
        phone,
        phoneHref,
        sequence,
        isActive,
        ...pickSeo(req.body),
      },
      { new: true }
    );

    if (!updated) return res.status(404).json({ isOk: false, message: "Location not found" });
    res.status(200).json({ isOk: true, data: updated, message: "Location updated successfully" });
  } catch (error) {
    console.error("Error updating location:", error);
    res.status(500).json({ isOk: false, message: "Failed to update location", error: error.message });
  }
};

export const deleteLocationCity = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await LocationCity.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    if (!deleted) return res.status(404).json({ isOk: false, message: "Location not found" });
    res.status(200).json({ isOk: true, message: "Location deleted successfully" });
  } catch (error) {
    res.status(500).json({ isOk: false, message: "Failed to delete location", error: error.message });
  }
};

export const listLocationCities = async (req, res) => {
  try {
    const list = await runListQuery(LocationCity, req.body, {
      searchFields: ["name", "slug", "district", "title"],
      filterable: FILTERABLE,
    });

    return res.status(200).json({ isOk: true, data: list, status: 200 });
  } catch (error) {
    console.error("Error listing locations:", error);
    return res.status(500).json({ isOk: false, message: error.message, status: 500 });
  }
};

export const getAllActiveLocationCities = async (req, res) => {
  try {
    const data = await LocationCity.find({ isActive: true }).sort({ sequence: 1, name: 1 });
    res.status(200).json({ isOk: true, data });
  } catch (error) {
    res.status(500).json({ isOk: false, message: "Failed to fetch locations", error: error.message });
  }
};
