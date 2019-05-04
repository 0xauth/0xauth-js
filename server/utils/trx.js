const TronWeb = require('tronweb')
const {toUtf8Bytes, keccak256, SigningKey, recoverAddress} = require('./ethers')
const constants = require('../constants')
const {isHex, hexStr2byteArray} = require('./common')

class Trx {

  sign(message, privateKey) {

    if (!isHex(message)) {
      message = Buffer.from(message, 'utf8').toString('hex')
    }

    message = message.replace(/^0x/, '')

    const signature = (new SigningKey(privateKey))
        .signDigest(keccak256([
          ...toUtf8Bytes(constants.trx.MESSAGE_HEADER),
          ...hexStr2byteArray(message)
        ]))

    const signatureHex = [
      '0x',
      signature.r.substring(2),
      signature.s.substring(2),
      Number(signature.v).toString(16)
    ].join('')

    return signatureHex

  }

  verify(message, signature, address) {

    if (!isHex(message)) {
      message = Buffer.from(message, 'utf8').toString('hex')
    }

    message = message.replace(/^0x/, '')
    signature = signature.replace(/^0x/, '')

    const messageBytes = [
      ...toUtf8Bytes(constants.trx.MESSAGE_HEADER),
      ...hexStr2byteArray(message)
    ]

    const messageDigest = keccak256(messageBytes)
    const recovered = recoverAddress(messageDigest, {
      recoveryParam: signature.substring(128, 130) == '1c' ? 1 : 0,
      r: '0x' + signature.substring(0, 64),
      s: '0x' + signature.substring(64, 128)
    })

    const recoveredAddress = constants.trx.ADDRESS_PREFIX + recovered.substr(2)
    return TronWeb.address.fromHex(recoveredAddress) === TronWeb.address.fromHex(address)
  }



}

module.exports = new Trx
