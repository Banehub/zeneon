import { pool } from '../config/db';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  featured: boolean;
  created_at: string;
}

export const getAllProducts = async () => {
  const connection = await pool.getConnection();
  try {
    const [products] = await connection.execute('SELECT * FROM products ORDER BY created_at DESC');
    return products;
  } finally {
    connection.release();
  }
};

export const getProductById = async (productId: string) => {
  const connection = await pool.getConnection();
  try {
    const [products] = await connection.execute('SELECT * FROM products WHERE id = ?', [productId]);
    return (products as any[])[0];
  } finally {
    connection.release();
  }
};

export const getProductsByCategoryName = async (categoryName: string) => {
  const connection = await pool.getConnection();
  try {
    const [products] = await connection.execute('SELECT * FROM products WHERE category = ?', [categoryName]);
    return products;
  } finally {
    connection.release();
  }
};

export const getAllCategories = async () => {
  const connection = await pool.getConnection();
  try {
    const [categories] = await connection.execute('SELECT * FROM categories');
    return categories;
  } finally {
    connection.release();
  }
};

export const getCategoryById = async (categoryId: string) => {
  const connection = await pool.getConnection();
  try {
    const [categories] = await connection.execute('SELECT * FROM categories WHERE `key` = ?', [categoryId]);
    return (categories as any[])[0];
  } finally {
    connection.release();
  }
};

export const getFeaturedProducts = async () => {
  const connection = await pool.getConnection();
  try {
    const [products] = await connection.execute('SELECT * FROM products WHERE featured = true');
    return products;
  } finally {
    connection.release();
  }
};

export const fetchCartItems = async (cartItems: Array<{ productId: string; quantity: number }>) => {
  const connection = await pool.getConnection();
  try {
    const productIds = cartItems.map(item => item.productId);
    const [products] = await connection.execute(
      'SELECT * FROM products WHERE id IN (?)',
      [productIds]
    );
    
    return (products as any[]).map(product => {
      const cartItem = cartItems.find(item => item.productId === product.id.toString());
      return {
        ...product,
        quantity: cartItem?.quantity || 0
      };
    });
  } finally {
    connection.release();
  }
};

export const searchProducts = async (input: string) => {
  const connection = await pool.getConnection();
  try {
    const [products] = await connection.execute(
      'SELECT * FROM products WHERE name LIKE ? OR description LIKE ?',
      [`%${input}%`, `%${input}%`]
    );
    return products;
  } finally {
    connection.release();
  }
};

export const fetchProducts = async (): Promise<Product[]> => {
  const connection = await pool.getConnection();
  try {
    // First check if created_at column exists
    const [columns] = await connection.execute('SHOW COLUMNS FROM products LIKE "created_at"');
    const hasCreatedAt = (columns as any[]).length > 0;
    
    const query = hasCreatedAt 
      ? 'SELECT * FROM products ORDER BY created_at DESC'
      : 'SELECT * FROM products';
      
    const [products] = await connection.execute(query);
    return products as Product[];
  } finally {
    connection.release();
  }
};

export const fetchProductById = async (id: number): Promise<Product | null> => {
  const connection = await pool.getConnection();
  try {
    const [products] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
    return (products as any[])[0] || null;
  } finally {
    connection.release();
  }
}; 