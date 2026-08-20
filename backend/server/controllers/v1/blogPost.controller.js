import { runListQuery } from "../../utils/listQuery.js";
import BlogPost from "../../models/BlogPost.js";
import { pickSeo } from "../../models/seo.js";

const FILTERABLE = {
  title: "string",
  slug: "string",
  topic: "string",
  isActive: "boolean",
  createdAt: "date",
};

export const createBlogPost = async (req, res) => {
  try {
    const { title, slug, topic, excerpt, content, image, icon, publishDate, url, isActive } = req.body;

    const existing = await BlogPost.findOne({ slug: slug.toLowerCase() });
    if (existing) {
      return res.status(400).json({ isOk: false, message: "Blog post with this slug already exists" });
    }

    const newDoc = new BlogPost({
      title,
      slug: slug.toLowerCase(),
      topic: topic || "Motors",
      excerpt,
      content: content || "",
      image,
      icon: icon || "cog",
      publishDate: publishDate || new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }),
      url: url || `/blog/${slug.toLowerCase()}`,
      isActive: isActive ?? true,
      ...pickSeo(req.body, { withImageAlt: true }),
    });

    const saved = await newDoc.save();
    res.status(201).json({ isOk: true, data: saved, message: "Blog post created successfully" });
  } catch (error) {
    console.error("Error creating blog post:", error);
    res.status(500).json({ isOk: false, message: "Failed to create blog post", error: error.message });
  }
};

export const getBlogPostById = async (req, res) => {
  try {
    const doc = await BlogPost.findById(req.params.id);
    if (!doc) return res.status(404).json({ isOk: false, message: "Blog post not found" });
    res.status(200).json({ isOk: true, data: doc });
  } catch (error) {
    res.status(500).json({ isOk: false, message: "Failed to fetch blog post", error: error.message });
  }
};

export const getBlogPostBySlug = async (req, res) => {
  try {
    const doc = await BlogPost.findOne({ slug: req.params.slug, isActive: true });
    if (!doc) return res.status(404).json({ isOk: false, message: "Blog post not found" });
    res.status(200).json({ isOk: true, data: doc });
  } catch (error) {
    res.status(500).json({ isOk: false, message: "Failed to fetch blog post", error: error.message });
  }
};

export const updateBlogPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, slug, topic, excerpt, content, image, icon, publishDate, url, isActive } = req.body;

    if (slug) {
      const existing = await BlogPost.findOne({ slug: slug.toLowerCase(), _id: { $ne: id } });
      if (existing) {
        return res.status(400).json({ isOk: false, message: "Blog post with this slug already exists" });
      }
    }

    const updated = await BlogPost.findByIdAndUpdate(
      id,
      {
        title,
        slug: slug ? slug.toLowerCase() : undefined,
        topic,
        excerpt,
        content,
        image,
        icon,
        publishDate,
        url: url || (slug ? `/blog/${slug.toLowerCase()}` : undefined),
        isActive,
        ...pickSeo(req.body, { withImageAlt: true }),
      },
      { new: true }
    );

    if (!updated) return res.status(404).json({ isOk: false, message: "Blog post not found" });
    res.status(200).json({ isOk: true, data: updated, message: "Blog post updated successfully" });
  } catch (error) {
    console.error("Error updating blog post:", error);
    res.status(500).json({ isOk: false, message: "Failed to update blog post", error: error.message });
  }
};

export const deleteBlogPost = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await BlogPost.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    if (!deleted) return res.status(404).json({ isOk: false, message: "Blog post not found" });
    res.status(200).json({ isOk: true, message: "Blog post deleted successfully" });
  } catch (error) {
    res.status(500).json({ isOk: false, message: "Failed to delete blog post", error: error.message });
  }
};

export const listBlogPosts = async (req, res) => {
  try {
    const list = await runListQuery(BlogPost, req.body, {
      searchFields: ["title", "slug", "topic", "excerpt"],
      filterable: FILTERABLE,
    });

    return res.status(200).json({ isOk: true, data: list, status: 200 });
  } catch (error) {
    console.error("Error listing blog posts:", error);
    return res.status(500).json({ isOk: false, message: error.message, status: 500 });
  }
};

export const getAllActiveBlogPosts = async (req, res) => {
  try {
    const data = await BlogPost.find({ isActive: true }).sort({ createdAt: -1 });
    res.status(200).json({ isOk: true, data });
  } catch (error) {
    res.status(500).json({ isOk: false, message: "Failed to fetch blog posts", error: error.message });
  }
};
