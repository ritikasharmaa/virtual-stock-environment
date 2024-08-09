const Stock = require('../models/Stock');

// Controller to get all stocks
exports.getAllStocks = async (req, res) => {
  try {
    const stocks = await Stock.find();
    res.json(stocks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching stocks', error });
  }
};