const User = require('../models/User');
const Address = require('../models/Address');
const Solicitation = require('../models/Solicitation');

module.exports = {
  async All(req, res) {
    await User.deleteMany({});
    await Address.deleteMany({});
    const solicitation = await Solicitation.deleteMany({});
    return res.json(solicitation)
  }
}