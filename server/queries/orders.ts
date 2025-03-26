import { pool } from '../config/db';

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
}

export const insertOrder = async (order: Order): Promise<number> => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // Insert order
    const [orderResult] = await connection.execute(
      'INSERT INTO orders (order_address, created_on, user_id, payment_status) VALUES (?, ?, ?, ?)',
      [order.orderAddress, order.createdOn, order.userId, 'pending']
    );

    const orderId = (orderResult as any).insertId;

    // Insert order items
    for (const item of order.orderItems) {
      await connection.execute(
        'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
        [orderId, item.productId, item.quantity, item.price]
      );
    }

    await connection.commit();
    return orderId;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

export const updatePaymentStatus = async (orderId: number, paymentStatus: string): Promise<boolean> => {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.execute(
      'UPDATE orders SET payment_status = ? WHERE id = ?',
      [paymentStatus, orderId]
    );
    return (result as any).affectedRows > 0;
  } finally {
    connection.release();
  }
};

export const fetchOrders = async (userId: string): Promise<any[]> => {
  const connection = await pool.getConnection();
  try {
    const [orders] = await connection.execute(
      `SELECT o.*, 
        GROUP_CONCAT(
          JSON_OBJECT(
            'productId', oi.product_id,
            'quantity', oi.quantity,
            'price', oi.price
          )
        ) as orderItems
      FROM orders o
      LEFT JOIN order_items oi ON o.id = oi.order_id
      WHERE o.user_id = ?
      GROUP BY o.id
      ORDER BY o.created_on DESC`,
      [userId]
    );

    return (orders as any[]).map(order => ({
      ...order,
      orderItems: order.orderItems ? JSON.parse(`[${order.orderItems}]`) : []
    }));
  } finally {
    connection.release();
  }
}; 