// Custom libs
const brands = require('../../data/brands.json');
const products = require('../../data/products.json');
const stock = require('../../data/stock.json');

module.exports.getAllBrands = (parent, args, context) => {
  return brands;
};

module.exports.getBrandById = (parent, { id }, context) => {
  return brands.find((b) => b.id.toString() === id);
};

module.exports.getBrandBySlug = (parent, { slug }, context) => {
  return brands.find((b) => b.slug.toLowerCase() === slug.toLowerCase());
};

module.exports.getBrandSlugs = (parent, args, context) => {
  return brands.map((b) => b.slug);
};

module.exports.getAllProducts = (parent, args, context) => {
  return products;
};

module.exports.productStock = (parent, { productId }, context) => {
  const result = stock.find((s) => s.productId.toString() === productId);
  return result;
};
