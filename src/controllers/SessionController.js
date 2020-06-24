const jwt = require("jsonwebtoken");

const User = require("../models/User");
const auth = require("../config/auth");

module.exports = {
  async store(req, res) {
    const { cpf, dateBirth } = req.body;

    const user = await User.findOne({ cpf, dateBirth });

    if (!user) {
      return res.status(401).json({ error: "Usuário não existe" });
    }
    const { _id, name } = user;
    return res.json({
      user: {
        _id,
        name,
        cpf
      },
      token: jwt.sign({ _id }, auth.secret, {
        expiresIn: auth.expiresIn
      })
    });
  }
};
