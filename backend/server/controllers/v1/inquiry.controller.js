import { runListQuery } from "../../utils/listQuery.js";
import Inquiry from "../../models/Inquiry.js";

const FILTERABLE = {
  type: "string",
  name: "string",
  phone: "string",
  email: "string",
  status: "string",
  category: "string",
  isActive: "boolean",
  createdAt: "date",
};

export const createInquiry = async (req, res) => {
  try {
    const { type, name, company, email, phone, category, productName, quantity, timeline, details, status, notes } = req.body;

    const newDoc = new Inquiry({
      type: type || "contact_inquiry",
      name,
      company,
      email,
      phone,
      category,
      productName,
      quantity: quantity || 1,
      timeline,
      details,
      status: status || "New",
      notes,
    });

    const saved = await newDoc.save();
    res.status(201).json({ isOk: true, data: saved, message: "Inquiry / RFQ submitted successfully" });
  } catch (error) {
    console.error("Error creating inquiry:", error);
    res.status(500).json({ isOk: false, message: "Failed to submit inquiry", error: error.message });
  }
};

export const getInquiryById = async (req, res) => {
  try {
    const doc = await Inquiry.findById(req.params.id);
    if (!doc) return res.status(404).json({ isOk: false, message: "Inquiry not found" });
    res.status(200).json({ isOk: true, data: doc });
  } catch (error) {
    res.status(500).json({ isOk: false, message: "Failed to fetch inquiry", error: error.message });
  }
};

export const updateInquiry = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, name, company, email, phone, category, productName, quantity, timeline, details, status, notes, isActive } = req.body;

    const updated = await Inquiry.findByIdAndUpdate(
      id,
      { type, name, company, email, phone, category, productName, quantity, timeline, details, status, notes, isActive },
      { new: true }
    );

    if (!updated) return res.status(404).json({ isOk: false, message: "Inquiry not found" });
    res.status(200).json({ isOk: true, data: updated, message: "Inquiry updated successfully" });
  } catch (error) {
    console.error("Error updating inquiry:", error);
    res.status(500).json({ isOk: false, message: "Failed to update inquiry", error: error.message });
  }
};

export const deleteInquiry = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Inquiry.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    if (!deleted) return res.status(404).json({ isOk: false, message: "Inquiry not found" });
    res.status(200).json({ isOk: true, message: "Inquiry deleted successfully" });
  } catch (error) {
    res.status(500).json({ isOk: false, message: "Failed to delete inquiry", error: error.message });
  }
};

export const listInquiries = async (req, res) => {
  try {
    const list = await runListQuery(Inquiry, req.body, {
      searchFields: ["name", "phone", "email", "company", "productName", "details"],
      filterable: FILTERABLE,
    });

    return res.status(200).json({ isOk: true, data: list, status: 200 });
  } catch (error) {
    console.error("Error listing inquiries:", error);
    return res.status(500).json({ isOk: false, message: error.message, status: 500 });
  }
};
