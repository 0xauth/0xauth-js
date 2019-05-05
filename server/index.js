class Server {

  constructor() {
    this.auth = require('./Auth')
  }
}

module.exports = new Server

