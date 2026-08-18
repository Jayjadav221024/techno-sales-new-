import express from 'express';
import BlogPost from '../models/BlogPost.js';

const router = express.Router();

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await BlogPost.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create or update a post
router.post('/', async (req, res) => {
  try {
    const post = await BlogPost.findOneAndUpdate(
      { slug: req.body.slug },
      req.body,
      { new: true, upsert: true }
    );
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a post by slug
router.delete('/:slug', async (req, res) => {
  try {
    await BlogPost.deleteOne({ slug: req.params.slug });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
