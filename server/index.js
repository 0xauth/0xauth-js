class Server {

  constructor() {
    this.Auth = require('./Auth')
    this.auth = new this.Auth
  }
}

module.exports = new Server

