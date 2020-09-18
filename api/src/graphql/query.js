// Custom libs
const brands = require('../../data/brands.json');
const products = require('../../data/products.json');
const stock = require('../../data/stock.json');

module.exports.getAllBrands = (parent, args, context) => {
  return brands;
};

module.exports.getAllProducts = (parent, args, context) => {
  return products;
};

module.exports.productStock = (parent, { productId }, context) => {
  const result = stock.find((s) => s.productId.toString() === productId);
  return result;
};
