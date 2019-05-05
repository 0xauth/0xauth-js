const TronWeb = require('tronweb')
const {
  toUtf8Bytes,
  keccak256,
  SigningKey,
  recoverAddress,
  isHex,
  hexStr2byteArray
} = require('../utils')

const constants = require('../constants')

class Trx {

  static sign(message, privateKey) {

    if (!isHex(message)) {
      message = Buffer.from(message, 'utf8').toString('hex')
    }

    message = message.replace(/^0x/, '')

    const signature = (new SigningKey(privateKey))
        .signDigest(keccak256([
          ...toUtf8Bytes(constants.TRX_MESSAGE_HEADER),
          ...hexStr2byteArray(message)
        ]))

    return [
      '0x',
      signature.r.substring(2),
      signature.s.substring(2),
      Number(signature.v).toString(16)
    ].join('')
  }

  static getAddress(privateKey) {
    return TronWeb.address.fromPrivateKey(privateKey)
  }

  static verify(message, signature, address) {

    if (!isHex(message)) {
      message = Buffer.from(message, 'utf8').toString('hex')
    }

    message = message.replace(/^0x/, '')
    signature = signature.replace(/^0x/, '')

    const messageBytes = [
      ...toUtf8Bytes(constants.TRX_MESSAGE_HEADER),
      ...hexStr2byteArray(message)
    ]

    const messageDigest = keccak256(messageBytes)
    const recovered = recoverAddress(messageDigest, {
      recoveryParam: signature.substring(128, 130) === '1c' ? 1 : 0,
      r: '0x' + signature.substring(0, 64),
      s: '0x' + signature.substring(64, 128)
    })

    const recoveredAddress = constants.TRX_ADDRESS_PREFIX + recovered.substr(2)
    return TronWeb.address.fromHex(recoveredAddress) === TronWeb.address.fromHex(address)
  }


}

module.exports = Trx
