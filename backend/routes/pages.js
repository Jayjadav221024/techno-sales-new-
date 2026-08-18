import express from 'express';
import Page from '../models/Page.js';

const router = express.Router();

// Get all pages
router.get('/', async (req, res) => {
  try {
    const pages = await Page.find();
    res.json(pages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get page by path parameter (supports multi-level path e.g. /custom/sub)
router.get('/*', async (req, res) => {
  try {
    const path = '/' + req.params[0];
    const page = await Page.findOne({ path });
    if (!page) {
      return res.status(404).json({ error: 'Page layout not found' });
    }
    res.json(page);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create or update a page
router.post('/', async (req, res) => {
  try {
    const { path, title, description, blocks } = req.body;
    let page = await Page.findOne({ path });
    if (page) {
      page.title = title;
      page.description = description;
      page.blocks = blocks;
      await page.save();
    } else {
      page = await Page.create({ path, title, description, blocks });
    }
    res.json(page);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a page
router.delete('/*', async (req, res) => {
  try {
    const path = '/' + req.params[0];
    await Page.deleteOne({ path });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
