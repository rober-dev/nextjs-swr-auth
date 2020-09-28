// Custom libs
const brands = require('../../data/brands.json');
const products = require('../../data/products.json');
const stock = require('../../data/stock.json');

module.exports.getAllBrands = (parent, args, { lng, storeKey, userId }) => {
  const result = brands.map((b) => {
    return {
      ...b,
      name: b.name + '-' + lng,
    };
  });
  return result;
};

module.exports.getBrandBySlug = (
  parent,
  { slug },
  { lng, storeKey, userId }
) => {
  const result = brands.find(
    (b) => b.slug.toLowerCase() === slug.toLowerCase()
  );
  return {
    ...result,
    name: result.name + '-' + lng,
  };
};

module.exports.getBrandById = (parent, { id }, { lng }) => {
  return brands.find((b) => b.id.toString() === id);
};

module.exports.getBrandSlugs = (parent, args, { lng }) => {
  return brands.map((b) => b.slug);
};

module.exports.getAllProducts = (parent, args, { lng }) => {
  return products;
};

module.exports.productStock = (parent, { productId }, { lng }) => {
  const result = stock.find((s) => s.productId.toString() === productId);
  return result;
};
