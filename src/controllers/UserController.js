const jwt = require('jsonwebtoken')

const User = require('../models/User');
const auth = require('../config/auth');

module.exports = {
  async store(req, res) {
    const { name, cpf, dateBirth, cell } = req.body;
    
    let user = await User.findOne({cpf});

    if (user) {
      return res.status(401).json({ error: "Usuário já existe" });
    }

    user = await User.create({
      name,
      cpf,
      dateBirth,
      cell
    });

    if (!user) {
      return res.status(401).json({ error: "Usuário não existe" });
    }

    const { _id } = user;
    return res.json({
      user: {
        _id,
        name,
        cpf,
        dateBirth
      },
      token: jwt.sign({ _id }, auth.secret, {
        expiresIn: auth.expiresIn
      })
    });
  },
  async updateUser(req, res) {
    const { id_user } = req.headers;
    const { name, cpf, dateBirth, cell } = req.body;

    const user = await User.findByIdAndUpdate({_id: id_user},{
      name, cpf, dateBirth, cell
    },{new:true})

    return res.json(user);
  },
};