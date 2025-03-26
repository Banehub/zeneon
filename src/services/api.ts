import { API_BASE_URL } from '../config';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  featured: boolean;
  created_at: string;
}

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  contactNumber: string;
  address: string;
}

export interface Order {
  id: number;
  userId: number;
  orderAddress: string;
  paymentStatus: string;
  createdAt: string;
}

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Something went wrong');
  }
  return response.json();
};

export const api = {
  // Products
  getProducts: async (): Promise<Product[]> => {
    const response = await fetch(`${API_BASE_URL}/products`);
    return handleResponse(response);
  },

  getProductById: async (id: number): Promise<Product> => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    return handleResponse(response);
  },

  // Auth
  login: async (email: string, password: string): Promise<{ token: string; user: User }> => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return handleResponse(response);
  },

  register: async (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    contactNumber: string;
    address: string;
  }): Promise<{ message: string }> => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  },

  // Orders
  createOrder: async (orderData: {
    orderAddress: string;
    orderItems: Array<{ productId: number; quantity: number; price: number }>;
    userId: number;
  }): Promise<{ orderId: number }> => {
    const response = await fetch(`${API_BASE_URL}/orders/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
    });
    return handleResponse(response);
  },

  getOrders: async (userId: number): Promise<Order[]> => {
    const response = await fetch(`${API_BASE_URL}/orders/fetchOrders/${userId}`);
    return handleResponse(response);
  },

  // User
  getUser: async (email: string): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/user/fetch/${email}`);
    return handleResponse(response);
  },

  updateUser: async (userData: {
    email: string;
    firstName?: string;
    lastName?: string;
    contactNumber?: string;
    address?: string;
  }): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/user/update`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  },
}; 