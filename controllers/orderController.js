const Order = require('../models/Order');

// Controller to create an order
exports.createOrder = async (req, res) => {
  const { symbol, quantity, price } = req.body;

  if (!symbol || !quantity || !price) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newOrder = new Order({
      symbol,
      quantity,
      price,
      date: new Date(),
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error });
  }
};