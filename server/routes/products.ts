import express, { Request, Response, Router, RequestHandler } from 'express';
import { 
  getAllProducts, 
  getProductById, 
  getProductsByCategoryName, 
  fetchCartItems, 
  searchProducts,
  getAllCategories,
  getCategoryById,
  getFeaturedProducts,
  fetchProducts,
  fetchProductById
} from '../queries/products';

interface CartItem {
  productId: string;
  quantity: number;
}

interface CartItemsRequest {
  cartItems: CartItem[];
}

const router: Router = express.Router();

const fetchAllHandler: RequestHandler = async (req, res) => {
  try {
    const results = await getAllProducts();
    res.status(200).json(results);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const fetchAllCategoriesHandler: RequestHandler = async (req, res) => {
  try {
    const results = await getAllCategories();
    res.status(200).json(results);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const fetchCategoryByIdHandler: RequestHandler<{ categoryId: string }> = async (req, res) => {
  try {
    const category = await getCategoryById(req.params.categoryId);
    if (!category) {
      res.status(404).json({ error: 'Category not found' });
      return;
    }

    const products = await getProductsByCategoryName(category.key);
    res.status(200).json({ category, products });
  } catch (error) {
    console.error('Error fetching category and products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const fetchFeaturedHandler: RequestHandler = async (req, res) => {
  try {
    const results = await getFeaturedProducts();
    res.status(200).json(results);
  } catch (error) {
    console.error('Error fetching featured products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getProductsHandler: RequestHandler = async (req, res) => {
  try {
    const products = await fetchProducts();
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getProductByIdHandler: RequestHandler<{ id: string }> = async (req, res) => {
  try {
    const product = await fetchProductById(Number(req.params.id));
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    res.status(200).json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const fetchCartItemsHandler: RequestHandler<{}, {}, CartItemsRequest> = async (req, res) => {
  try {
    const { cartItems } = req.body;
    const results = await fetchCartItems(cartItems);
    res.status(200).json(results);
  } catch (error) {
    console.error('Error fetching cart items:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const searchHandler: RequestHandler<{ input: string }> = async (req, res) => {
  try {
    const results = await searchProducts(req.params.input);
    res.status(200).json(results);
  } catch (error) {
    console.error('Error searching products:', error);
    res.status(500).json({ error: 'Failed to search products' });
  }
};

router.get('/fetchAll', fetchAllHandler);
router.get('/fetchAllCategories', fetchAllCategoriesHandler);
router.get('/fetchCategoryById/:categoryId', fetchCategoryByIdHandler);
router.get('/fetchFeatured', fetchFeaturedHandler);
router.get('/', getProductsHandler);
router.get('/:id', getProductByIdHandler);
router.post('/fetchCartItems', fetchCartItemsHandler);
router.get('/search/:input', searchHandler);

export default router; 