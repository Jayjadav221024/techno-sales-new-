import { runListQuery } from "../../utils/listQuery.js";
import JobOpening from "../../models/JobOpening.js";

const FILTERABLE = {
  title: "string",
  department: "string",
  location: "string",
  employmentType: "string",
  isActive: "boolean",
  createdAt: "date",
};

/**
 * Responsibilities and requirements arrive from the admin form as one textarea
 * per field, a line per bullet. Anything already an array is left alone so the
 * API stays usable without the form.
 */
const toLines = (value) => {
  if (Array.isArray(value)) return value.map((v) => String(v).trim()).filter(Boolean);
  if (typeof value === "string" && value) {
    return value.split(/\r?\n|,/).map((s) => s.trim()).filter(Boolean);
  }
  return undefined;
};

export const createJobOpening = async (req, res) => {
  try {
    const {
      title, department, location, employmentType, experience, openings,
      salaryRange, desc, responsibilities, requirements, applyEmail, sequence, isActive,
    } = req.body;

    const newDoc = new JobOpening({
      title,
      department,
      location,
      employmentType: employmentType || "full-time",
      experience,
      openings: openings || 1,
      salaryRange,
      desc,
      responsibilities: toLines(responsibilities) ?? [],
      requirements: toLines(requirements) ?? [],
      applyEmail,
      sequence: sequence || 0,
      isActive: isActive ?? true,
    });

    const saved = await newDoc.save();
    res.status(201).json({ isOk: true, data: saved, message: "Job opening created successfully" });
  } catch (error) {
    console.error("Error creating job opening:", error);
    res.status(500).json({ isOk: false, message: "Failed to create job opening", error: error.message });
  }
};

export const getJobOpeningById = async (req, res) => {
  try {
    const doc = await JobOpening.findById(req.params.id);
    if (!doc) return res.status(404).json({ isOk: false, message: "Job opening not found" });
    res.status(200).json({ isOk: true, data: doc });
  } catch (error) {
    res.status(500).json({ isOk: false, message: "Failed to fetch job opening", error: error.message });
  }
};

export const updateJobOpening = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title, department, location, employmentType, experience, openings,
      salaryRange, desc, responsibilities, requirements, applyEmail, sequence, isActive,
    } = req.body;

    const updated = await JobOpening.findByIdAndUpdate(
      id,
      {
        title,
        department,
        location,
        employmentType,
        experience,
        openings,
        salaryRange,
        desc,
        responsibilities: toLines(responsibilities),
        requirements: toLines(requirements),
        applyEmail,
        sequence,
        isActive,
      },
      { new: true }
    );

    if (!updated) return res.status(404).json({ isOk: false, message: "Job opening not found" });
    res.status(200).json({ isOk: true, data: updated, message: "Job opening updated successfully" });
  } catch (error) {
    console.error("Error updating job opening:", error);
    res.status(500).json({ isOk: false, message: "Failed to update job opening", error: error.message });
  }
};

export const deleteJobOpening = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await JobOpening.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    if (!deleted) return res.status(404).json({ isOk: false, message: "Job opening not found" });
    res.status(200).json({ isOk: true, message: "Job opening deleted successfully" });
  } catch (error) {
    res.status(500).json({ isOk: false, message: "Failed to delete job opening", error: error.message });
  }
};

export const listJobOpenings = async (req, res) => {
  try {
    const list = await runListQuery(JobOpening, req.body, {
      searchFields: ["title", "department", "location", "desc"],
      filterable: FILTERABLE,
    });

    return res.status(200).json({ isOk: true, data: list, status: 200 });
  } catch (error) {
    console.error("Error listing job openings:", error);
    return res.status(500).json({ isOk: false, message: error.message, status: 500 });
  }
};

export const getAllActiveJobOpenings = async (req, res) => {
  try {
    const data = await JobOpening.find({ isActive: true }).sort({ sequence: 1, createdAt: -1 });
    res.status(200).json({ isOk: true, data });
  } catch (error) {
    res.status(500).json({ isOk: false, message: "Failed to fetch job openings", error: error.message });
  }
};
