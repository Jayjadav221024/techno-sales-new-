import { runListQuery } from "../../utils/listQuery.js";
import BrandPartner from "../../models/BrandPartner.js";

const FILTERABLE = {
  name: "string",
  badge: "string",
  badgeType: "string",
  isActive: "boolean",
  createdAt: "date",
};

export const createBrandPartner = async (req, res) => {
  try {
    const { name, badge, badgeType, desc, lines, logo, sequence, isActive } = req.body;

    const newDoc = new BrandPartner({
      name,
      badge,
      badgeType: badgeType || "official",
      desc,
      lines: Array.isArray(lines) ? lines : (typeof lines === "string" && lines ? lines.split(",").map(s => s.trim()) : []),
      logo,
      sequence: sequence || 0,
      isActive: isActive ?? true,
    });

    const saved = await newDoc.save();
    res.status(201).json({ isOk: true, data: saved, message: "Brand partner created successfully" });
  } catch (error) {
    console.error("Error creating brand partner:", error);
    res.status(500).json({ isOk: false, message: "Failed to create brand partner", error: error.message });
  }
};

export const getBrandPartnerById = async (req, res) => {
  try {
    const doc = await BrandPartner.findById(req.params.id);
    if (!doc) return res.status(404).json({ isOk: false, message: "Brand partner not found" });
    res.status(200).json({ isOk: true, data: doc });
  } catch (error) {
    res.status(500).json({ isOk: false, message: "Failed to fetch brand partner", error: error.message });
  }
};

export const updateBrandPartner = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, badge, badgeType, desc, lines, logo, sequence, isActive } = req.body;

    const updated = await BrandPartner.findByIdAndUpdate(
      id,
      {
        name,
        badge,
        badgeType,
        desc,
        lines: Array.isArray(lines) ? lines : (typeof lines === "string" && lines ? lines.split(",").map(s => s.trim()) : undefined),
        logo,
        sequence,
        isActive,
      },
      { new: true }
    );

    if (!updated) return res.status(404).json({ isOk: false, message: "Brand partner not found" });
    res.status(200).json({ isOk: true, data: updated, message: "Brand partner updated successfully" });
  } catch (error) {
    console.error("Error updating brand partner:", error);
    res.status(500).json({ isOk: false, message: "Failed to update brand partner", error: error.message });
  }
};

export const deleteBrandPartner = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await BrandPartner.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    if (!deleted) return res.status(404).json({ isOk: false, message: "Brand partner not found" });
    res.status(200).json({ isOk: true, message: "Brand partner deleted successfully" });
  } catch (error) {
    res.status(500).json({ isOk: false, message: "Failed to delete brand partner", error: error.message });
  }
};

export const listBrandPartners = async (req, res) => {
  try {
    const list = await runListQuery(BrandPartner, req.body, {
      searchFields: ["name", "badge", "desc"],
      filterable: FILTERABLE,
    });

    return res.status(200).json({ isOk: true, data: list, status: 200 });
  } catch (error) {
    console.error("Error listing brand partners:", error);
    return res.status(500).json({ isOk: false, message: error.message, status: 500 });
  }
};

export const getAllActiveBrandPartners = async (req, res) => {
  try {
    const data = await BrandPartner.find({ isActive: true }).sort({ sequence: 1, name: 1 });
    res.status(200).json({ isOk: true, data });
  } catch (error) {
    res.status(500).json({ isOk: false, message: "Failed to fetch brand partners", error: error.message });
  }
};
