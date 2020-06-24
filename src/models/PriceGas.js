const mongoose = require('mongoose');

const PriceGasSchema = new mongoose.Schema({
  priceGasP13: String,
});
module.exports = mongoose.model('PriceGas', PriceGasSchema);
