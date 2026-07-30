const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5145;

app.use(cors());
app.use(express.json());

// Get all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json({ success: true, products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Failed to fetch products' });
  }
});

// Create product
app.post('/api/products', async (req, res) => {
  try {
    const { title, price, videoUrl, category, description, buyUrl, thumbnailUrl } = req.body;
    if (!title || !price || !videoUrl || !category) {
      return res.status(400).json({ success: false, error: 'Title, price, videoUrl, and category are required' });
    }
    const product = await prisma.product.create({
      data: { title, price, videoUrl, category, description, buyUrl, thumbnailUrl }
    });
    res.json({ success: true, product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Failed to create product' });
  }
});

// Update product
app.put('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, price, videoUrl, category, description, buyUrl, thumbnailUrl } = req.body;
    const product = await prisma.product.update({
      where: { id },
      data: { title, price, videoUrl, category, description, buyUrl, thumbnailUrl }
    });
    res.json({ success: true, product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Failed to update product' });
  }
});

// Delete product
app.delete('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.product.delete({
      where: { id }
    });
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Failed to delete product' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
