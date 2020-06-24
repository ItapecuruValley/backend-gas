const mongoose = require('mongoose');

const SolicitationSchema = new mongoose.Schema({
  pay: String,
  gas: String,
  quant: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  addressId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address'
  },
  deliveryman:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Deliveryman'
  },
  status: String,
  createdAtt: String,
  updatedAtt: String,
  time: String
});

module.exports = mongoose.model('Solicitation', SolicitationSchema);
