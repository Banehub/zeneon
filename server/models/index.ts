import mongoose from 'mongoose';

// User Model
interface User {
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  contactNumber: string;
  address: string;
  activated: boolean;
  activationToken?: string;
  _id?: string;
  toObject(): any;
}

const userSchema = new mongoose.Schema<User>({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  contactNumber: { type: String, required: true },
  address: { type: String, required: true },
  activated: { type: Boolean, default: false },
  activationToken: String
});

// Product Model
interface Product {
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  featured: boolean;
  _id?: string;
  toObject(): any;
}

const productSchema = new mongoose.Schema<Product>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String, required: true },
  featured: { type: Boolean, default: false }
});

// Category Model
interface Category {
  name: string;
  key: string;
  _id?: string;
  toObject(): any;
}

const categorySchema = new mongoose.Schema<Category>({
  name: { type: String, required: true },
  key: { type: String, required: true, unique: true }
});

// Order Model
interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

interface Order {
  orderAddress: string;
  orderItems: OrderItem[];
  createdOn: string;
  userId: string;
  paymentStatus?: string;
  _id?: string;
  toObject(): any;
}

const orderSchema = new mongoose.Schema<Order>({
  orderAddress: { type: String, required: true },
  orderItems: [{
    productId: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
  }],
  createdOn: { type: String, required: true },
  userId: { type: String, required: true },
  paymentStatus: { type: String, default: 'pending' }
});

// Create models only if they don't exist
export const User = mongoose.models.User || mongoose.model<User>('User', userSchema);
export const Product = mongoose.models.Product || mongoose.model<Product>('Product', productSchema);
export const Category = mongoose.models.Category || mongoose.model<Category>('Category', categorySchema);
export const Order = mongoose.models.Order || mongoose.model<Order>('Order', orderSchema);

// Export interfaces
export type { User, Product, Category, Order, OrderItem }; 