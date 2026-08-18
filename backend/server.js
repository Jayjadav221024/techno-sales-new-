import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import Page from './models/Page.js';
import pageRoutes from './routes/pages.js';
import productRoutes from './routes/products.js';
import blogRoutes from './routes/blog.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/technosales';

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB successfully');
    seedDatabase();
  })
  .catch(err => console.error('MongoDB connection error:', err));

// Seeder to populate initial data if database is empty
async function seedDatabase() {
  try {
    const pageCount = await Page.countDocuments();
    if (pageCount === 0) {
      console.log('Seeding initial page builder layouts...');
      await Page.create([
        {
          path: '/',
          title: 'Home',
          blocks: [
            {
              id: 'b1',
              type: 'hero',
              content: {
                title: 'High-Performance Electro-Mechanical Solutions',
                subtitle: 'Authorized Siemens switchgears, Crompton induction motors, and Polycab industrial cables for Ankleshwar GIDC.'
              }
            },
            {
              id: 'b2',
              type: 'features',
              content: {
                title: 'Why Choose Techno Sales?',
                items: [
                  '10+ Years of Industry Trust',
                  'Ready Inventory in Ankleshwar',
                  'Same-Day Technical Quotations',
                  'Hassle-Free Post-Sale Support'
                ]
              }
            }
          ]
        }
      ]);
    }
  } catch (err) {
    console.error('Seeding database error:', err);
  }
}

// Mount modular routes
app.use('/api/pages', pageRoutes);
app.use('/api/products', productRoutes);
app.use('/api/blog', blogRoutes);

app.listen(PORT, () => {
  console.log(`Express server running on port ${PORT}`);
});
