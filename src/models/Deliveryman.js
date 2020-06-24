const mongoose = require('mongoose');

const DeliverymanSchema = new mongoose.Schema({
  name: String,
  cell: String,
  code: String
})
module.exports = mongoose.model('Deliveryman', DeliverymanSchema);
