const Address = require('../models/Address');

module.exports = {
  async store(req, res) {
    const { street, district, houseNumber, pointReference } = req.body;

    const address = await Address.create({
      street,
      district,
      houseNumber,
      pointReference,
      user: req.userIdToken
    });

    return res.json(address);
  },
  async updateAddress(req, res) {
    const { id_address } = req.headers;
    const { street, district, houseNumber, pointReference } = req.body;

    const address = await Address.findByIdAndUpdate({_id: id_address},{
      street, 
      district, 
      houseNumber, 
      pointReference
    },{new:true})

    return res.json(address);
  },
  async showIdAddress(req, res) {
    const { id_address } = req.headers;

    const address = await Address.find({ _id:id_address })

    return res.json(address)
  }
};
