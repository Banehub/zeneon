import express from 'express';
import { products } from '../data/products';

const router = express.Router();

// Get all products
router.get('/', (req, res) => {
  res.json(products);
});

// Get product by ID
router.get('/:id', (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// Get products by category
router.get('/category/:category', (req, res) => {
  const categoryProducts = products.filter(
    (p) => p.category.toLowerCase() === req.params.category.toLowerCase()
  );
  res.json(categoryProducts);
});

export default router; 