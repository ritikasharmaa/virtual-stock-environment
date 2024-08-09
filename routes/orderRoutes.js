const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Route to create an order
router.post('/orders', orderController.createOrder);

module.exports = router;