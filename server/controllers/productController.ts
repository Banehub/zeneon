import { Request, Response } from 'express';
import { products } from '../data/products.js';

// Get all products
export const getProducts = async (req: Request, res: Response) => {
  try {
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get single product
export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = products.find(p => p._id === req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Create a product
export const createProduct = async (req: Request, res: Response) => {
  try {
    const newProduct = {
      _id: (products.length + 1).toString(),
      ...req.body,
      rating: 0,
      numReviews: 0
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: 'Invalid product data' });
  }
};

// Update a product
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const index = products.findIndex(p => p._id === req.params.id);
    if (index !== -1) {
      products[index] = { ...products[index], ...req.body };
      res.json(products[index]);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid product data' });
  }
};

// Delete a product
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const index = products.findIndex(p => p._id === req.params.id);
    if (index !== -1) {
      products.splice(index, 1);
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
}; 