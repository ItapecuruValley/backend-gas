const jwt = require('jsonwebtoken')
const util = require('util')

const authConfig = require('../config/auth')

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if(!authHeader){
    return res.status(401).json({error: 'Não existe token'})
  }

  const [, token] = authHeader.split(' ')

  try {
    const decoded = await util.promisify(jwt.verify)(token, authConfig.secret)

    req.userIdToken = decoded._id
    
  } catch (err) {
    return res.status(401).json({erro: "Token Invalido"})
  }
  return next()
    
}