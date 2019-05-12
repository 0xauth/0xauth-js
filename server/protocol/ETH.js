const sigUtil = require('eth-sig-util')
const ethereumjsUtil = require('ethereumjs-util')
const Web3 = require('web3')

class ETH {

  static typedParams(token) {
    return {
      data: [
        {
          type: 'string',
          name: '0xAuthToken',
          value: token
        }
      ]
    }
  }

  static sign(token, privateKey, version = 't1') {
    privateKey = privateKey.replace(/^0x/, '')
    if (version === 't1') {
      privateKey = Buffer.from(privateKey, 'hex')
      return sigUtil.signTypedDataLegacy(privateKey, ETH.typedParams(token))
    }
    throw new Error('Unsupported signing version.')
  }

  static verify(token, signature, address, version = 't1') {
    if (version === 't1') {
      return sigUtil.normalize(address) === sigUtil.recoverTypedSignatureLegacy({
        data: ETH.typedParams(token).data,
        sig: signature
      })
    }
    throw new Error('Unsupported signing version.')
  }

  static getAddress(privateKey) {
    return Buffer.from(ethereumjsUtil.privateToAddress(privateKey)).toString('hex')

    return (new Web3()).eth.accounts.privateKeyToAccount(privateKey).address
  }


}

module.exports = ETH
