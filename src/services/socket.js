const socket = require('socket.io')

let io;
const connections = [];

exports.setupWebSocket = (server) => {
  io = socket(server);

  io.on('connection', socket => {
    console.log(socket.id);
    
    connections.push({
      id: socket.id
    })
  })
}
exports.sendSolicitationDashboard = (message, data) => {
  io.emit(message, data)
}
exports.sendSolicitationDeliveryman = (message, data) => {
  io.emit(message, data) // metodo (to) para enviar ao DeliveryMan
}