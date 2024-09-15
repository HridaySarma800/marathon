import express from 'express';
import authorize from '../middleware/auth.js';
import orderController from '../controllers/orderController.js';
import Roles from '../middleware/auth.js'; // Ensure that Roles is correctly imported from your auth middleware

const router = express.Router();

const {
  addOrder,
  getOrderById,
  getOrdersByUserId,
  editOrder,
  deleteOrder,
  deleteOrdersByUserId,
} = orderController;

// Order Routes
router.post('/addOrder', authorize([Roles.Director, Roles.Admin, Roles.User]), addOrder);
router.get('/orders/:id', authorize([Roles.Director, Roles.Admin, Roles.User]), getOrderById);
router.get('/users/:userId/orders', authorize([Roles.Director, Roles.Admin, Roles.User]), getOrdersByUserId);
router.put('/orders/:id', authorize([Roles.Director, Roles.Admin]), editOrder);
router.delete('/orders/:id', authorize([Roles.Director, Roles.Admin]), deleteOrder);
router.delete('/users/:userId/orders', authorize([Roles.Director, Roles.Admin]), deleteOrdersByUserId);

export default router;
