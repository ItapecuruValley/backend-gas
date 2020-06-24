const PriceGas = require('../models/PriceGas')

module.exports = {
  // Criação de Preço (Usado apenas uma vez)
  async store(req, res) {
    const { p13 } = req.body;

    const prices = await PriceGas.create({
      priceGasP13: p13
    })
    return res.json(prices);
  },

  // Buscar Preço
  async showPrices(req, res){
    const prices = await PriceGas.findById("5ef1e5b3d950f310b962e2a5")

    return res.json(prices)
  },
  
  // Atualização de Preço
  async updatePrice(req, res){
    const { price } = req.body;

    const prices = await PriceGas.findByIdAndUpdate({_id: '5e6fff369f0e095b6c1651d5'},{
      priceGasP13: price 
    },{new:true})

    return res.json(prices)
  },
}