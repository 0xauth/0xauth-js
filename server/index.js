const request = require('superagent')
const cheerio = require('cheerio')
const sigUtil = require('eth-sig-util')
const jwt = require('jsonwebtoken')
const TronWeb = require('tronweb')

const EthUtils = require('./lib/EthUtils')
const TrxUtils = require('./lib/trxUtils')

class Server {

  signUp(token, signature) {

  }

  signIn(wallet, token, signature) {

    if (!wallet || !token || !signature) {
      return Promise.resolve({
        success: false,
        error: 'Wrong parameters'
      })
    }
    const recovered = sigUtil.recoverTypedSignature({
      data: [
        {
          type: 'string',
          name: 'tweedentity',
          value: `AuthToken: ${token}`
        }
      ],
      sig: signature
    })
    if (sigUtil.normalize(recovered) === sigUtil.normalize(wallet)) {
      const authToken = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 12)
      return Promise.resolve({
        success: true,
        authToken
      })
    } else {
      return Promise.resolve({
        success: false,
        error: 'Wrong signature'
      })
    }
  }

}


module.exports = new Server