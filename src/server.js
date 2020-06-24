const mongoose = require('mongoose');
const http = require('http')
const { setupWebSocket } = require('./services/socket')

const app = require('./App');
const server = http.Server(app)
setupWebSocket(server);

mongoose.connect("mongodb+srv://gasapp:YuqYVoQHqv2FxWzO@cluster0-w29qm.gcp.mongodb.net/appdrive?retryWrites=true&w=majority",
  {
    useFindAndModify: false,
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

server.listen(process.env.PORT || 3000, () => {
  console.log('Server Up')
});
