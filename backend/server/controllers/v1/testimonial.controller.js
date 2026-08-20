import { runListQuery } from "../../utils/listQuery.js";
import Testimonial from "../../models/Testimonial.js";

const FILTERABLE = {
  name: "string",
  role: "string",
  isActive: "boolean",
  createdAt: "date",
};

export const createTestimonial = async (req, res) => {
  try {
    const { name, role, initials, text, rating, sequence, isActive } = req.body;

    const newDoc = new Testimonial({
      name,
      role,
      initials: initials || (name ? name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase() : ""),
      text,
      rating: rating || 5,
      sequence: sequence || 0,
      isActive: isActive ?? true,
    });

    const saved = await newDoc.save();
    res.status(201).json({ isOk: true, data: saved, message: "Testimonial created successfully" });
  } catch (error) {
    console.error("Error creating testimonial:", error);
    res.status(500).json({ isOk: false, message: "Failed to create testimonial", error: error.message });
  }
};

export const getTestimonialById = async (req, res) => {
  try {
    const doc = await Testimonial.findById(req.params.id);
    if (!doc) return res.status(404).json({ isOk: false, message: "Testimonial not found" });
    res.status(200).json({ isOk: true, data: doc });
  } catch (error) {
    res.status(500).json({ isOk: false, message: "Failed to fetch testimonial", error: error.message });
  }
};

export const updateTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, role, initials, text, rating, sequence, isActive } = req.body;

    const updated = await Testimonial.findByIdAndUpdate(
      id,
      {
        name,
        role,
        initials: initials || (name ? name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase() : undefined),
        text,
        rating,
        sequence,
        isActive,
      },
      { new: true }
    );

    if (!updated) return res.status(404).json({ isOk: false, message: "Testimonial not found" });
    res.status(200).json({ isOk: true, data: updated, message: "Testimonial updated successfully" });
  } catch (error) {
    console.error("Error updating testimonial:", error);
    res.status(500).json({ isOk: false, message: "Failed to update testimonial", error: error.message });
  }
};

export const deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Testimonial.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    if (!deleted) return res.status(404).json({ isOk: false, message: "Testimonial not found" });
    res.status(200).json({ isOk: true, message: "Testimonial deleted successfully" });
  } catch (error) {
    res.status(500).json({ isOk: false, message: "Failed to delete testimonial", error: error.message });
  }
};

export const listTestimonials = async (req, res) => {
  try {
    const list = await runListQuery(Testimonial, req.body, {
      searchFields: ["name", "role", "text"],
      filterable: FILTERABLE,
    });

    return res.status(200).json({ isOk: true, data: list, status: 200 });
  } catch (error) {
    console.error("Error listing testimonials:", error);
    return res.status(500).json({ isOk: false, message: error.message, status: 500 });
  }
};

export const getAllActiveTestimonials = async (req, res) => {
  try {
    const data = await Testimonial.find({ isActive: true }).sort({ sequence: 1, createdAt: -1 });
    res.status(200).json({ isOk: true, data });
  } catch (error) {
    res.status(500).json({ isOk: false, message: "Failed to fetch testimonials", error: error.message });
  }
};
