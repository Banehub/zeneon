import express from 'express';
import cors from 'cors';
import { initializeDatabase } from './config/init-db';
import { testConnection } from './config/db';
import authRoutes from './routes/auth';
import productRoutes from './routes/products';
import orderRoutes from './routes/orders';
import userRoutes from './routes/user';
import helperRoutes from './routes/helper';

const app = express();
const port = process.env.PORT || 3011;

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/user', userRoutes);
app.use('/api/helper', helperRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', environment: process.env.NODE_ENV || 'development' });
});

// Setup database and start server
async function setupDatabase() {
  try {
    await testConnection();
    await initializeDatabase();
    console.log('Database setup completed successfully');
  } catch (error) {
    console.error('Failed to setup database:', error);
    process.exit(1);
  }
}

setupDatabase().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`API available at http://localhost:${port}/api`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  });
}); 