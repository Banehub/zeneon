import express, { Request, Response, Router, RequestHandler } from 'express';
import { 
  insertOrder, 
  updatePaymentStatus, 
  fetchOrders 
} from '../queries/orders';

interface OrderRequest {
  orderAddress: string;
  orderItems: Array<{
    productId: string;
    quantity: number;
    price: number;
  }>;
  createdOn: string;
  userId: string;
}

interface PaymentStatusRequest {
  orderId: number;
  paymentStatus: string;
}

const router: Router = express.Router();

const createOrderHandler: RequestHandler<{}, {}, OrderRequest> = async (req, res) => {
  try {
    // Format the date to ISO string format
    const date = new Date(req.body.createdOn);
    const formattedDate = date.toISOString().slice(0, 19).replace('T', ' ');
    
    const orderData = {
      orderAddress: req.body.orderAddress,
      orderItems: req.body.orderItems,
      createdOn: formattedDate,
      userId: req.body.userId
    };
    
    const orderId = await insertOrder(orderData);
    res.status(201).json({ message: 'Order created successfully', orderId });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updatePaymentStatusHandler: RequestHandler<{}, {}, PaymentStatusRequest> = async (req, res) => {
  try {
    const { orderId, paymentStatus } = req.body;
    const updated = await updatePaymentStatus(orderId, paymentStatus);
    
    if (!updated) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }
    
    res.status(200).json({ message: 'Payment status updated successfully' });
  } catch (error) {
    console.error('Error updating payment status:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getOrdersByUserIdHandler: RequestHandler<{ userId: string }> = async (req, res) => {
  try {
    const orders = await fetchOrders(req.params.userId);
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

router.post('/create', createOrderHandler);
router.post('/updatePaymentStatus', updatePaymentStatusHandler);
router.get('/fetchOrders/:userId', getOrdersByUserIdHandler);

export default router; 