// Custom libs
const brands = require('../../data/brands.json');
const products = require('../../data/products.json');
const stock = require('../../data/stock.json');

module.exports.getAllBrands = (parent, args, { lng, storeKey, userId }) => {
  const result = brands.map(b => {
    return {
      ...b,
      name: b.name + '-' + lng
    };
  });
  return result;
};

module.exports.getBrandBySlug = (
  parent,
  { slug },
  { lng, storeKey, userId }
) => {
  const result = brands.find(b => b.slug.toLowerCase() === slug.toLowerCase());
  return {
    ...result,
    name: result.name + '-' + lng
  };
};

module.exports.getBrandById = (parent, { id }, { lng }) => {
  return brands.find(b => b.id.toString() === id);
};

module.exports.getBrandSlugs = (parent, args, { lng }) => {
  return brands.map(b => b.slug);
};

module.exports.getAllProducts = (parent, args, { lng }) => {
  return products;
};

module.exports.getProductBySlug = (parent, { slug }, { lng }) => {
  const result = products.find(
    p => p.slug.toLowerCase() === slug.toLowerCase()
  );
  return result ? { ...result, name: result.name + '-' + lng } : null;
};

module.exports.getProductStock = (parent, { slug }, { lng }) => {
  const product = products.find(p => p.slug.toString() === slug);
  if (!product) {
    return null;
  }

  const result = stock.find(
    s => s.productId.toString() === product.id.toString()
  );
  return result;
};

module.exports.getProductSlugs = (parent, args, { lng }) => {
  return products.map(b => b.slug);
};
