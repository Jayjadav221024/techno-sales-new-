import { runListQuery } from "../../utils/listQuery.js";
import Category from "../../models/Category.js";
import { pickSeo } from "../../models/seo.js";

const FILTERABLE = {
  name: "string",
  slug: "string",
  title: "string",
  isActive: "boolean",
  createdAt: "date",
};

export const createCategory = async (req, res) => {
  try {
    const { name, slug, navLabel, title, tagline, image, blurb, longIntro, subcategories, faqs, sequence, isActive } = req.body;

    const existing = await Category.findOne({ slug: slug.toLowerCase() });
    if (existing) {
      return res.status(400).json({ isOk: false, message: "Category with this slug already exists" });
    }

    const newDoc = new Category({
      name,
      slug: slug.toLowerCase(),
      navLabel,
      title,
      tagline,
      image,
      blurb,
      longIntro: Array.isArray(longIntro) ? longIntro : (typeof longIntro === "string" && longIntro ? [longIntro] : []),
      subcategories: subcategories || [],
      faqs: faqs || [],
      sequence: sequence || 0,
      isActive: isActive ?? true,
      ...pickSeo(req.body, { withImageAlt: true }),
    });

    const saved = await newDoc.save();
    res.status(201).json({ isOk: true, data: saved, message: "Category created successfully" });
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ isOk: false, message: "Failed to create category", error: error.message });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const doc = await Category.findById(req.params.id);
    if (!doc) return res.status(404).json({ isOk: false, message: "Category not found" });
    res.status(200).json({ isOk: true, data: doc });
  } catch (error) {
    res.status(500).json({ isOk: false, message: "Failed to fetch category", error: error.message });
  }
};

export const getCategoryBySlug = async (req, res) => {
  try {
    const doc = await Category.findOne({ slug: req.params.slug, isActive: true });
    if (!doc) return res.status(404).json({ isOk: false, message: "Category not found" });
    res.status(200).json({ isOk: true, data: doc });
  } catch (error) {
    res.status(500).json({ isOk: false, message: "Failed to fetch category", error: error.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, slug, navLabel, title, tagline, image, blurb, longIntro, subcategories, faqs, sequence, isActive } = req.body;

    if (slug) {
      const existing = await Category.findOne({ slug: slug.toLowerCase(), _id: { $ne: id } });
      if (existing) {
        return res.status(400).json({ isOk: false, message: "Category with this slug already exists" });
      }
    }

    const updated = await Category.findByIdAndUpdate(
      id,
      {
        name,
        slug: slug ? slug.toLowerCase() : undefined,
        navLabel,
        title,
        tagline,
        image,
        blurb,
        longIntro: Array.isArray(longIntro) ? longIntro : (typeof longIntro === "string" && longIntro ? [longIntro] : undefined),
        subcategories,
        faqs,
        sequence,
        isActive,
        ...pickSeo(req.body, { withImageAlt: true }),
      },
      { new: true }
    );

    if (!updated) return res.status(404).json({ isOk: false, message: "Category not found" });
    res.status(200).json({ isOk: true, data: updated, message: "Category updated successfully" });
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ isOk: false, message: "Failed to update category", error: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Category.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    if (!deleted) return res.status(404).json({ isOk: false, message: "Category not found" });
    res.status(200).json({ isOk: true, message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ isOk: false, message: "Failed to delete category", error: error.message });
  }
};

export const listCategories = async (req, res) => {
  try {
    const list = await runListQuery(Category, req.body, {
      searchFields: ["name", "slug", "title", "blurb"],
      filterable: FILTERABLE,
    });

    return res.status(200).json({ isOk: true, data: list, status: 200 });
  } catch (error) {
    console.error("Error listing categories:", error);
    return res.status(500).json({ isOk: false, message: error.message, status: 500 });
  }
};

export const getAllActiveCategories = async (req, res) => {
  try {
    const data = await Category.find({ isActive: true }).sort({ sequence: 1, name: 1 });
    res.status(200).json({ isOk: true, data });
  } catch (error) {
    res.status(500).json({ isOk: false, message: "Failed to fetch categories", error: error.message });
  }
};
