const mongoose = require('mongoose');
const Stock = require('./models/Stock');

mongoose.connect('mongodb://localhost/stockDB')
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

const generateRandomPrice = () => {
  const minPrice = 100;
  const maxPrice = 5000;
  return Math.random() * (maxPrice - minPrice) + minPrice;
};

const stocks = [
  { symbol: 'AAPL', companyName: 'Apple Inc.', price: generateRandomPrice(), quantityAvailable: 1000 },
  { symbol: 'GOOGL', companyName: 'Alphabet Inc.', price: generateRandomPrice(), quantityAvailable: 500 },
  { symbol: 'AMZN', companyName: 'Amazon.com Inc.', price: generateRandomPrice(), quantityAvailable: 300 }
];

Stock.deleteMany({})
  .then(() => Stock.insertMany(stocks))
  .then(() => {
    console.log('Data inserted');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error inserting data:', err);
    mongoose.connection.close();
  });