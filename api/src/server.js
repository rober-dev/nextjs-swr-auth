// Vendor libs
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

// Custom libs
const authRoutes = require('./routes/auth.routes');

// Get environment variables
dotenv.config();

const { PORT } = process.env;

const app = express();
app.use(bodyParser.json({ extended: false }));

app.get('/', (req, res) => {
  res.json('hello');
});
app.post('/auth/login', authRoutes.login);

// Start server
app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  }
  console.log(`Express listening on port ${PORT}`);
});
