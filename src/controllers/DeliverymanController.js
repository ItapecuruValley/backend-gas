const Deliveryman = require('../models/Deliveryman');
const Solicitation = require('../models/Solicitation');

module.exports = {
  async createDeliveryman(req, res){
    const { name, cell } = req.body;

    const deliveryman = await Deliveryman.create({
      name,
      cell
    })
    return res.json(deliveryman)

  },
  async showDeliveryman(req, res){
    const deliveryman = await Deliveryman.find();
    return res.json(deliveryman)
  },
  async showSolicitationsDMan(req, res){
    const {deliveryman_id} = req.headers;

    const solicitationsDMan = await Solicitation.find({deliveryman: deliveryman_id})
      .populate('user').populate('addressId').populate('deliveryman').exec();
    return res.json(solicitationsDMan)
  }
}