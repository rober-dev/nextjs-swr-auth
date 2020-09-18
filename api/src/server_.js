// Vendor libs
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

// Custom libs
const authRoutes = require('./routes/routes.auth');
const catalogRoutes = require('./routes/routes.catalog');
const stockRoutes = require('./routes/routes.stock');

// Get environment variables
dotenv.config();

const { PORT } = process.env;

const app = express();
app.use(bodyParser.json({ extended: false }));

app.post('/auth/login', authRoutes.login);
app.post('/auth/register', authRoutes.register);
app.get('/catalog/brands', catalogRoutes.brands);
app.get('/catalog/brands/:id', catalogRoutes.brandById);
app.get('/catalog/products', catalogRoutes.products);
app.get('/catalog/products/:id', catalogRoutes.productById);
app.get('/catalog/products/:id/stock', stockRoutes.stockByProduct);

// Start server
app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  }
  console.log(`Express listening on port ${PORT}`);
});
