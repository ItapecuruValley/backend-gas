const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
  street: String,
  houseNumber: String,
  district: String,
  pointReference: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Address', AddressSchema);
