const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController');

// Route to get all stocks
router.get('/stocks', stockController.getAllStocks);

module.exports = router;