const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:5000');

ws.on('open', () => {
  console.log('Connected to the server');
});

ws.on('message', (data) => {
  const message = JSON.parse(data);
  if (message.type === 'initial-data') {
    console.log('Initial Stock Data:', message.data);
  } else if (message.type === 'price-update') {
    console.log(`Price Update: ${message.data.symbol} is now ${message.data.newPrice}`);
  }
});

ws.on('close', () => {
  console.log('Disconnected from the server');
});