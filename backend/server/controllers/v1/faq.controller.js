import { runListQuery } from "../../utils/listQuery.js";
import Faq from "../../models/Faq.js";

const FILTERABLE = {
  question: "string",
  category: "string",
  isActive: "boolean",
  createdAt: "date",
};

export const createFaq = async (req, res) => {
  try {
    const { question, answer, category, sequence, isActive } = req.body;

    const newDoc = new Faq({
      question,
      answer,
      category: category || "General",
      sequence: sequence || 0,
      isActive: isActive ?? true,
    });

    const saved = await newDoc.save();
    res.status(201).json({ isOk: true, data: saved, message: "FAQ created successfully" });
  } catch (error) {
    console.error("Error creating FAQ:", error);
    res.status(500).json({ isOk: false, message: "Failed to create FAQ", error: error.message });
  }
};

export const getFaqById = async (req, res) => {
  try {
    const doc = await Faq.findById(req.params.id);
    if (!doc) return res.status(404).json({ isOk: false, message: "FAQ not found" });
    res.status(200).json({ isOk: true, data: doc });
  } catch (error) {
    res.status(500).json({ isOk: false, message: "Failed to fetch FAQ", error: error.message });
  }
};

export const updateFaq = async (req, res) => {
  try {
    const { id } = req.params;
    const { question, answer, category, sequence, isActive } = req.body;

    const updated = await Faq.findByIdAndUpdate(
      id,
      { question, answer, category, sequence, isActive },
      { new: true }
    );

    if (!updated) return res.status(404).json({ isOk: false, message: "FAQ not found" });
    res.status(200).json({ isOk: true, data: updated, message: "FAQ updated successfully" });
  } catch (error) {
    console.error("Error updating FAQ:", error);
    res.status(500).json({ isOk: false, message: "Failed to update FAQ", error: error.message });
  }
};

export const deleteFaq = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Faq.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    if (!deleted) return res.status(404).json({ isOk: false, message: "FAQ not found" });
    res.status(200).json({ isOk: true, message: "FAQ deleted successfully" });
  } catch (error) {
    res.status(500).json({ isOk: false, message: "Failed to delete FAQ", error: error.message });
  }
};

export const listFaqs = async (req, res) => {
  try {
    const list = await runListQuery(Faq, req.body, {
      searchFields: ["question", "answer", "category"],
      filterable: FILTERABLE,
    });

    return res.status(200).json({ isOk: true, data: list, status: 200 });
  } catch (error) {
    console.error("Error listing FAQs:", error);
    return res.status(500).json({ isOk: false, message: error.message, status: 500 });
  }
};

export const getAllActiveFaqs = async (req, res) => {
  try {
    const filter = { isActive: true };
    if (req.query.category) {
      filter.category = req.query.category;
    }
    const data = await Faq.find(filter).sort({ sequence: 1, createdAt: -1 });
    res.status(200).json({ isOk: true, data });
  } catch (error) {
    res.status(500).json({ isOk: false, message: "Failed to fetch FAQs", error: error.message });
  }
};
