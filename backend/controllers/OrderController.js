const Order = require("../models/Order");
const User = require("../models/User");

exports.placeOrder = async (req, res) => {
  try {
    const newOrder = new Order({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    await newOrder.save();
    await User.findByIdAndUpdate(req.body.userId, { cartData: {} });
    res.json({ success: true, message: "Order placed successfully", orderId: newOrder._id });
  } catch (err) {
    console.log("Error placing order:", err);
    res.status(500).json({ success: false, message: "Error placing the order" });
  }
};

exports.verifyOrder = async (req, res) => {
  try {
    const { success, orderId } = req.body;
    if (!success || !orderId) {
      return res.status(400).json({ success: false, message: "Missing parameters" });
    }
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
    if (["completed", "verified"].includes(order.status.toLowerCase())) {
      return res.status(400).json({ success: false, message: "Order already verified" });
    }
    res.json({ success: true, message: "Order verification successful" });
  } catch {
    res.status(500).json({ success: false, message: "Error verifying the order" });
  }
};

exports.userOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch {
    res.json({ success: false, message: "Error fetching orders" });
  }
};

exports.listOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json({ success: true, data: orders });
  } catch {
    res.json({ success: false, message: "Error fetching orders" });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    await Order.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
    res.json({ success: true, message: "Status updated" });
  } catch {
    res.json({ success: false, message: "Error updating status" });
  }
};
