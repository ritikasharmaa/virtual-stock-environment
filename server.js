const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const mongoose = require('mongoose');
const stockRoutes = require('./routes/stockRoutes');
const orderRoutes = require('./routes/orderRoutes');
const Stock = require('./models/Stock');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Connect to MongoDB
mongoose.connect('mongodb://localhost/stockDB')
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

app.use(express.json());


app.use('/api', stockRoutes);
app.use('/api', orderRoutes)

// WebSocket connection handling
wss.on('connection', (ws, req) => {
  console.log('New client connected');

  // On connection, send initial stock data
  Stock.find().then((stocks) => {
    ws.send(JSON.stringify({
      type: 'initial-data',
      data: stocks,
    }));
  });

  // Handle client disconnection
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// Function to trigger price update event
const triggerPriceUpdateEvent = (stock) => {
  const event = {
    type: 'price-update',
    data: {
      symbol: stock.symbol,
      newPrice: stock.price,
    },
  };

  // Broadcast to all connected clients
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(event));
    }
  });
};

// Simulate random price updates within a range
const simulatePriceUpdates = () => {
  Stock.find().then((stocks) => {
    stocks.forEach((stock) => {
      const min = stock.price * 0.95;
      const max = stock.price * 1.05;
      const newPrice = (Math.random() * (max - min) + min).toFixed(2);
      stock.price = newPrice;
      stock.save();

      // Trigger price update event
      triggerPriceUpdateEvent(stock);
    });
  });
};

// Update prices every 5 seconds
setInterval(simulatePriceUpdates, 5000);

server.listen(5000, () => console.log('Server started on port 5000'));