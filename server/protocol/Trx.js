const TronWeb = require('tronweb')

class Trx {

  static sign(message, privateKey) {
    if (!TronWeb.utils.isHex(message)) {
      message = Buffer.from(message, 'utf8').toString('hex')
    }
    return TronWeb.Trx.signString(message, privateKey)
  }

  static getAddress(privateKey) {
    return TronWeb.address.fromPrivateKey(privateKey)
  }

  static verify(message, signature, address) {
    if (!TronWeb.utils.isHex(message)) {
      message = Buffer.from(message, 'utf8').toString('hex')
    }
    return TronWeb.Trx.verifySignature(message, address, signature)
  }

}

module.exports = Trx
