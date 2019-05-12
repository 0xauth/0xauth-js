const TronWeb = require('tronweb')

class TRX {

  static sign(token, privateKey, version = 'ps') {
    if (version === 'ps') {
      if (!TronWeb.utils.isHex(token)) {
        token = Buffer.from(token, 'utf8').toString('hex')
      }
      return TronWeb.Trx.signString(token, privateKey)
    }
    throw new Error('Unsupported signing version.')
  }

  static verify(token, signature, address, version = 'ps') {
    if (version === 'ps') {
      if (!TronWeb.utils.isHex(token)) {
        token = Buffer.from(token, 'utf8').toString('hex')
      }
      return TronWeb.Trx.verifySignature(token, address, signature)
    }
    throw new Error('Unsupported signing version.')
  }

  static getAddress(privateKey) {
    return TronWeb.address.fromPrivateKey(privateKey)
  }

}

module.exports = TRX