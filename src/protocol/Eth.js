const sigUtil = require('eth-sig-util')
const ethereumjsUtil = require('ethereumjs-util')

class Eth {

  static sign(token, privateKey, version = 'ps') {

    privateKey = privateKey.replace(/^0x/, '')
    switch (version) {
      case 'ps':
        privateKey = Buffer.from(privateKey, 'hex')
        return sigUtil.personalSign(privateKey, {
          data: token
        })
      case 't1':
        privateKey = Buffer.from(privateKey, 'hex')
        return sigUtil.signTypedDataLegacy(privateKey, {
          data: [
            {
              type: 'string',
              name: 'token',
              value: token
            }
          ]
        })
    }
    throw new Error('Unsupported signing version.')
  }

  static verify(token, signature, address, version = 'ps') {
    switch (version) {
      case 'ps':
        return sigUtil.normalize(address) === sigUtil.recoverPersonalSignature({
          data: token,
          sig: signature
        })
      case 't1':
        return sigUtil.normalize(address) === sigUtil.recoverTypedSignatureLegacy({
          data: [
            {
              type: 'string',
              name: 'token',
              value: token
            }
          ],
          sig: signature
        })
    }
    throw new Error('Unsupported signing version.')
  }

  static getAddress(privateKey) {
    return Buffer.from(ethereumjsUtil.privateToAddress(privateKey)).toString('hex')
  }


}

module.exports = Eth
