const User = require('../models/User');
const Address = require('../models/Address');
const Solicitation = require('../models/Solicitation');

module.exports = {
  async userDashboard(req, res) {
    const user = await User.findById(req.userIdToken);

    return res.json(user);
  },

  async addressDashboard(req, res) {
    const findUser = await Address.find({ user: req.userIdToken }); 

    return res.json(findUser);
  },
  async solicitationDashboard(req, res) {
    const findSolicitaions = await Solicitation.find({user: req.userIdToken})
      .populate('user').populate('addressId').populate('deliveryman').exec();;

    return res.json(findSolicitaions)
  }
};
