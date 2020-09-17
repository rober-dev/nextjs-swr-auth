// Custom libs
const stock = require('../../data/stock.json');

module.exports.stockByProduct = (req, res) => {
  const result = stock.filter((s) => s.productId.toString() === req.params.id);
  return res.json(result);
};
