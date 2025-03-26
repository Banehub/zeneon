import express from 'express';
import cors from 'cors';
import productsRouter from './routes/products';

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// API routes
app.use('/api/products', productsRouter);

app.listen(port, () => {
  console.log(`🚀 API Server running on port ${port}`);
  console.log(`👉 API available at http://localhost:${port}/api`);
}); 