const User = require('../models/User');
const Address = require('../models/Address');
const Solicitation = require('../models/Solicitation');

module.exports = {
  async showUser(req, res) {
    const findUser = await User.find();
    return res.json(findUser);
  },

  async showAllAddress(req, res) {
    const findAddress = await Address.find()
      .populate('user')
      .exec();
    return res.json(findAddress);
  },

  async showAllSolicitation(req, res) {
    const findSolicitation = await Solicitation.find()
    .populate('user').populate('addressId').populate('deliveryman').exec();

    return res.json(findSolicitation);
  },

  async showEspecificAddress(req, res) {
    const { user_id } = req.headers;
    // fornece dados tanto para o Mobile (Token)
    const findUser = await Address.find({ user: user_id }); 

    return res.json(findUser);
  },

  async showEspecificSolicitaions(req, res) {
    const { user_id } = req.headers;
    
    const findSolicitaions = await Solicitation.find({user: user_id});

    return res.json(findSolicitaions)
  }
};
