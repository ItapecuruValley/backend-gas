const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  cpf: {
    unique: true,
    type: String
  },
  dateBirth: String,
  cell: String
});
module.exports = mongoose.model('User', UserSchema);
