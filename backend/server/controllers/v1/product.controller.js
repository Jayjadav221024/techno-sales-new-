import { runListQuery } from "../../utils/listQuery.js";
import Product from "../../models/Product.js";
import { pickSeo } from "../../models/seo.js";
import Category from "../../models/Category.js";

const FILTERABLE = {
  name: "string",
  slug: "string",
  categorySlug: "string",
  brand: "string",
  isActive: "boolean",
  createdAt: "date",
};

export const createProduct = async (req, res) => {
  try {
    const { name, slug, categorySlug, brand, specBadge, specs, desc, image, icon, intro, applications, whyChoose, faqs, sequence, isActive } = req.body;

    const existing = await Product.findOne({ slug: slug.toLowerCase() });
    if (existing) {
      return res.status(400).json({ isOk: false, message: "Product with this slug already exists" });
    }

    let categoryId = undefined;
    if (categorySlug) {
      const cat = await Category.findOne({ slug: categorySlug.toLowerCase() });
      if (cat) categoryId = cat._id;
    }

    const newDoc = new Product({
      name,
      slug: slug.toLowerCase(),
      categorySlug: categorySlug ? categorySlug.toLowerCase() : "motors",
      categoryId,
      brand,
      specBadge,
      specs: Array.isArray(specs) ? specs : (typeof specs === "string" && specs ? specs.split(",").map(s => s.trim()) : []),
      desc,
      image,
      icon,
      intro: Array.isArray(intro) ? intro : (typeof intro === "string" && intro ? [intro] : []),
      applications: Array.isArray(applications) ? applications : (typeof applications === "string" && applications ? applications.split(",").map(s => s.trim()) : []),
      whyChoose: Array.isArray(whyChoose) ? whyChoose : (typeof whyChoose === "string" && whyChoose ? whyChoose.split(",").map(s => s.trim()) : []),
      faqs: faqs || [],
      sequence: sequence || 0,
      isActive: isActive ?? true,
      ...pickSeo(req.body, { withImageAlt: true }),
    });

    const saved = await newDoc.save();
    res.status(201).json({ isOk: true, data: saved, message: "Product created successfully" });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ isOk: false, message: "Failed to create product", error: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const doc = await Product.findById(req.params.id).populate("categoryId", "name slug");
    if (!doc) return res.status(404).json({ isOk: false, message: "Product not found" });
    res.status(200).json({ isOk: true, data: doc });
  } catch (error) {
    res.status(500).json({ isOk: false, message: "Failed to fetch product", error: error.message });
  }
};

export const getProductBySlug = async (req, res) => {
  try {
    const doc = await Product.findOne({ slug: req.params.slug, isActive: true }).populate("categoryId", "name slug");
    if (!doc) return res.status(404).json({ isOk: false, message: "Product not found" });
    res.status(200).json({ isOk: true, data: doc });
  } catch (error) {
    res.status(500).json({ isOk: false, message: "Failed to fetch product", error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, slug, categorySlug, brand, specBadge, specs, desc, image, icon, intro, applications, whyChoose, faqs, sequence, isActive } = req.body;

    if (slug) {
      const existing = await Product.findOne({ slug: slug.toLowerCase(), _id: { $ne: id } });
      if (existing) {
        return res.status(400).json({ isOk: false, message: "Product with this slug already exists" });
      }
    }

    let categoryId = undefined;
    if (categorySlug) {
      const cat = await Category.findOne({ slug: categorySlug.toLowerCase() });
      if (cat) categoryId = cat._id;
    }

    const updated = await Product.findByIdAndUpdate(
      id,
      {
        name,
        slug: slug ? slug.toLowerCase() : undefined,
        categorySlug: categorySlug ? categorySlug.toLowerCase() : undefined,
        ...(categoryId ? { categoryId } : {}),
        brand,
        specBadge,
        specs: Array.isArray(specs) ? specs : (typeof specs === "string" && specs ? specs.split(",").map(s => s.trim()) : undefined),
        desc,
        image,
        icon,
        intro: Array.isArray(intro) ? intro : (typeof intro === "string" && intro ? [intro] : undefined),
        applications: Array.isArray(applications) ? applications : (typeof applications === "string" && applications ? applications.split(",").map(s => s.trim()) : undefined),
        whyChoose: Array.isArray(whyChoose) ? whyChoose : (typeof whyChoose === "string" && whyChoose ? whyChoose.split(",").map(s => s.trim()) : undefined),
        faqs,
        sequence,
        isActive,
        ...pickSeo(req.body, { withImageAlt: true }),
      },
      { new: true }
    );

    if (!updated) return res.status(404).json({ isOk: false, message: "Product not found" });
    res.status(200).json({ isOk: true, data: updated, message: "Product updated successfully" });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ isOk: false, message: "Failed to update product", error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Product.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    if (!deleted) return res.status(404).json({ isOk: false, message: "Product not found" });
    res.status(200).json({ isOk: true, message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ isOk: false, message: "Failed to delete product", error: error.message });
  }
};

export const listProducts = async (req, res) => {
  try {
    const list = await runListQuery(Product, req.body, {
      searchFields: ["name", "slug", "categorySlug", "brand", "desc"],
      filterable: FILTERABLE,
    });

    return res.status(200).json({ isOk: true, data: list, status: 200 });
  } catch (error) {
    console.error("Error listing products:", error);
    return res.status(500).json({ isOk: false, message: error.message, status: 500 });
  }
};

export const getAllActiveProducts = async (req, res) => {
  try {
    const filter = { isActive: true };
    if (req.query.category) {
      filter.categorySlug = req.query.category.toLowerCase();
    }
    const data = await Product.find(filter).sort({ sequence: 1, createdAt: -1 });
    res.status(200).json({ isOk: true, data });
  } catch (error) {
    res.status(500).json({ isOk: false, message: "Failed to fetch products", error: error.message });
  }
};
