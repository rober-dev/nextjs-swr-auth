// Custom libs
const brands = require('../../data/brands.json');
const products = require('../../data/products.json');

module.exports.brands = (req, res) => {
  return res.json(brands);
};

module.exports.products = (req, res) => {
  return res.json(products);
};

module.exports.brandById = (req, res) => {
  const result = brands.find((b) => b.id.toString() === req.params.id);
  return res.json(result);
};

module.exports.productById = (req, res) => {
  const result = products.find((b) => b.id.toString() === req.params.id);
  return res.json(result);
};
