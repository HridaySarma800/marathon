import GlobalResponse from "../models/global_response.js";
import db from "../models/index.js"; // Ensure this path is correct based on your project structure.

// Get Order by ID with product details
const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await db.orders.findOne({
      where: { id },
      include: [
        {
          model: db.products,
          as: 'product', // Make sure 'product' matches the alias used in your order model
        }
      ]
    });

    if (order) {
      return res.status(200).send(new GlobalResponse(true, "Order retrieved successfully", order));
    }
    return res.status(404).send(new GlobalResponse(false, "Order not found", {}));
  } catch (err) {
    return res.status(500).send(new GlobalResponse(false, "Failed to retrieve order. " + err.message, {}));
  }
};

// Get Orders by User ID with product details
const getOrdersByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await db.orders.findAll({
      where: { userId },
      include: [
        {
          model: db.products,
          as: 'product', // Make sure 'product' matches the alias used in your order model
        }
      ]
    });

    if (orders.length > 0) {
      return res.status(200).send(new GlobalResponse(true, "Orders retrieved successfully", orders));
    }
    return res.status(404).send(new GlobalResponse(false, "No orders found for this user", {}));
  } catch (err) {
    return res.status(500).send(new GlobalResponse(false, "Failed to retrieve orders. " + err.message, {}));
  }
};

// Add Order with product details
const addOrder = async (req, res) => {
  try {
    const {
      userId,
      productId,
      quantity,
      status,
    } = req.body;

    // Validate required fields
    if (!userId || !productId || !quantity || !status) {
      return res.status(400).send(new GlobalResponse(false, "Missing required fields", {}));
    }

    // Find the product details
    const product = await db.products.findOne({ where: { id: productId } });
    
    if (!product) {
      return res.status(404).send(new GlobalResponse(false, "Product not found", {}));
    }

    // Create a new order
    const newOrder = await db.orders.create({
      userId,
      productId,
      quantity,
      status,
    });

    // Attach product details to the new order
    const orderWithDetails = await db.orders.findOne({
      where: { id: newOrder.id },
      include: [
        {
          model: db.products,
          as: 'product',
        }
      ]
    });

    return res.status(201).send(new GlobalResponse(true, "Order added successfully", orderWithDetails));
  } catch (err) {
    return res.status(500).send(new GlobalResponse(false, "Failed to add order. " + err.message, {}));
  }
};

// Edit Order
const editOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const [updated] = await db.orders.update(updatedData, {
      where: { id },
    });

    if (updated) {
      const updatedOrder = await db.orders.findOne({
        where: { id },
        include: [
          {
            model: db.products,
            as: 'product',
          }
        ]
      });
      return res.status(200).send(new GlobalResponse(true, "Order updated successfully", updatedOrder));
    }
    throw new Error("Order not found");
  } catch (err) {
    return res.status(500).send(new GlobalResponse(false, "Failed to update order. " + err.message, {}));
  }
};

// Delete Order
const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await db.orders.destroy({
      where: { id },
    });

    if (deleted) {
      return res.status(200).send(new GlobalResponse(true, "Order deleted successfully", {}));
    }
    throw new Error("Order not found");
  } catch (err) {
    return res.status(500).send(new GlobalResponse(false, "Failed to delete order. " + err.message, {}));
  }
};

// Delete All Orders by User ID
const deleteOrdersByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const deleted = await db.orders.destroy({ where: { userId } });

    if (deleted) {
      return res.status(200).send(new GlobalResponse(true, "All orders deleted successfully for userId", {}));
    }
    return res.status(404).send(new GlobalResponse(false, "No orders found for this user", {}));
  } catch (err) {
    return res.status(500).send(new GlobalResponse(false, "Failed to delete orders by userId. " + err.message, {}));
  }
};

export default {
  getOrderById,
  getOrdersByUserId,
  addOrder,
  editOrder,
  deleteOrder,
  deleteOrdersByUserId,
};
