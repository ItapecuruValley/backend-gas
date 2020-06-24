const Solicitation = require('../models/Solicitation');
const {sendSolicitationDashboard, sendSolicitationDeliveryman} = require('../services/socket')

module.exports = {
  async store(req, res) {

    let dia = `${new Date().getDate()}`.length; 
    let mes = `${new Date().getMonth()}`.length;
    let horas = `${new Date().getHours()}`.length;
    var dataAtual = undefined;
    switch (mes) {
      case  1:
        if(dia === 1){
          if(horas === 1){
          dataAtual = `${new Date().getFullYear()}0${new Date().getMonth()+1}0${new Date().getDate()} 0${new Date().getHours()}:${new Date().getMinutes()}`;
          }else{
            dataAtual = `${new Date().getFullYear()}0${new Date().getMonth()+1}0${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`;
          }
        } else {
          if(horas === 1){
            dataAtual = `${new Date().getFullYear()}0${new Date().getMonth()+1}${new Date().getDate()} 0${new Date().getHours()}:${new Date().getMinutes()}`;
          }else{
            dataAtual = `${new Date().getFullYear()}0${new Date().getMonth()+1}${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`;
          }
        }
        break;
      case 2:
        if(dia === 2){
          if(horas === 2){
            dataAtual = `${new Date().getFullYear()}${new Date().getMonth()+1}${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`;
          }else{
          dataAtual = `${new Date().getFullYear()}${new Date().getMonth()+1}${new Date().getDate()} 0${new Date().getHours()}:${new Date().getMinutes()}`;
          }
        } else {
          if(horas === 2){
            dataAtual = `${new Date().getFullYear()}${new Date().getMonth()+1}0${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`;
          }else{
            dataAtual = `${new Date().getFullYear()}${new Date().getMonth()+1}0${new Date().getDate()} 0${new Date().getHours()}:${new Date().getMinutes()}`;
          }
        }
        break;
    }
    const { pay, gas, addressId, quant, deliveryman } = req.body;

    const solicitation = await Solicitation.create({
      pay,
      gas,
      quant,
      user: req.userIdToken,
      addressId,
      deliveryman,
      createdAtt: dataAtual
      // Pegar data 20170620 11:20
    })
    
    sendSolicitationDashboard('newSolicitation', solicitation)
    
    // await solicitation.populate('user').populate('addressId').populate('deliveryman').exec();


    return res.json(solicitation);
  },
  // Update Deliveryman for Dashboard
  async updateD(req, res) {
    const { deliveryman } = req.body;
    const { id_soli } = req.headers;
    const solicitation = await Solicitation.findByIdAndUpdate({_id: id_soli},{
      deliveryman},{new:true})
   
    sendSolicitationDeliveryman('newSolicitationDeliveryman', solicitation)
    return res.json(solicitation)
  },
  // Update Status for Dashboard
  async updateS(req, res) { 
    // Pegando Dia e Mes (1 ou 2 Digitos)
    let dia = `${new Date().getDate()}`.length; 
    let mes = `${new Date().getMonth()}`.length;
    let horas = `${new Date().getHours()}`.length;
    var dataAtual = undefined;
    switch (mes) {
      case  1:
        if(dia === 1){
          if(horas === 1){
          dataAtual = `${new Date().getFullYear()}0${new Date().getMonth()+1}0${new Date().getDate()} 0${new Date().getHours()}:${new Date().getMinutes()}`;
          }else{
            dataAtual = `${new Date().getFullYear()}0${new Date().getMonth()+1}0${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`;
          }
        } else {
          if(horas === 1){
            dataAtual = `${new Date().getFullYear()}0${new Date().getMonth()+1}${new Date().getDate()} 0${new Date().getHours()}:${new Date().getMinutes()}`;
          }else{
            dataAtual = `${new Date().getFullYear()}0${new Date().getMonth()+1}${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`;
          }
        }
        break;
      case 2:
        if(dia === 2){
          if(horas === 2){
            dataAtual = `${new Date().getFullYear()}${new Date().getMonth()+1}${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`;
          }else{
          dataAtual = `${new Date().getFullYear()}${new Date().getMonth()+1}${new Date().getDate()} 0${new Date().getHours()}:${new Date().getMinutes()}`;
          }
        } else {
          if(horas === 2){
            dataAtual = `${new Date().getFullYear()}${new Date().getMonth()+1}0${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`;
          }else{
            dataAtual = `${new Date().getFullYear()}${new Date().getMonth()+1}0${new Date().getDate()} 0${new Date().getHours()}:${new Date().getMinutes()}`;
          }
        }
        break;
    }
  
    const { status } = req.body;
    const { id_soli } = req.headers;
    let solicitation = await Solicitation.findByIdAndUpdate({_id: id_soli},{
      status, 
      updatedAtt: dataAtual,
    },{new:true})
    
    var dtPartida = solicitation.createdAtt;
    var dtChegada = solicitation.updatedAtt;
    
    console.log(`Criação: ${dtPartida}.... Update: ${dtChegada}`);
    
    var dtPartida1 = new Date(dtPartida.slice(0,4), dtPartida.slice(4,6),dtPartida.slice(6,8), dtPartida.slice(9,11), dtPartida.slice(12,14));
    var dtChegada1 = new Date(dtChegada.slice(0,4), dtChegada.slice(4,6),dtChegada.slice(6,8), dtChegada.slice(9,11), dtChegada.slice(12,14));
    
    var diffMs = (dtChegada1 - dtPartida1);    
    var diffHrs = Math.floor((diffMs % 86400000) / 3600000);
    var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
    var time = diffHrs + 'h ' + diffMins + 'm';  

    let statusAtt = await Solicitation.findByIdAndUpdate({_id: id_soli},{
      time
    },{new:true})
    
    return res.json("statusAtt")
  },

  async showIdSolicitation(req, res) {
    const { id_solicitation } = req.headers;

    const SolicitationID = await Solicitation.find({ _id:id_solicitation })
            .populate('user').populate('addressId').populate('deliveryman').exec()

    return res.json(SolicitationID)
  }

};
