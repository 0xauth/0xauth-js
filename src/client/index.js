const {supportedChains} = require('../config')
const ClientUtils = require('./ClientUtils')

class Client {

  constructor() {
    this.tronWeb = false
    this.web3 = false
  }

  init(chain, instance) {
    switch (chain) {
      case 'trx':
        this.tronWeb = instance
        break
      case 'eth':
        this.web3 = instance0
        break
    }
  }

  async sign(authTokenString, chain, format = 'ps') {
    chain = normalizeChain(chain)
    if (!chain) {
      throw new Error('A valid, supported chain is required.')
    }

    if (chain === 'trx' && !this.tronWeb) {
      throw new Error('TronWeb not found')
    } else if (chain === 'etx' && !this.web3) {
      throw new Error('Web3 not found')
    }

    let sig
    let address
    let hexString = ClientUtils.hexEncode(authTokenString)
    switch (chain) {
      case 'trx':
        address = this.tronWeb.defaultAddress.base58
        sig = [await this.tronSign(hexString), 'tronweb', format].join(':')
        break
      case 'eth':
        address = this.web3.eth.accounts[0]
        sig = [await this.ethSign(hexString, address, format), 'web3', format].join(':')
        break
    }
    if (!sig) {
      return false
    }
    return [authTokenString, [chain, address].join(':'), sig].join(';')
  }

  async tronSign(hexString) {
    return this.tronWeb.trx.sign(hexString)
  }

  async ethSign(hexString, from, format) {
      if (!from) {
        throw new Error('Web3 not connected')
      }
      let params
      let method

      if (format === 'ps') {

        method = 'personal_sign'
        params = [hexString, from]

      } else if (format === 't1') {

        method = 'eth_signTypedData'
        params = [
          {
            type: 'string',
            name: 'token',
            value: hexString
          }
        ]

      } else {
        throw new Error('Format not supported')
      }

      return new Promise((resolve, reject) => {
        this.web3.currentProvider.sendAsync({
          method,
          params,
          from,
        }, function (err, result) {
          if (err) reject(err)
          if (result.error) reject(result.error)
          resolve(result.result)
        })
      })

  }

  static normalizeChain(chain) {
    if (typeof chain === 'string' && supportedChains.includes(chain.toLowerCase())) {
      return chain.toLowerCase()
    }
  }

}

module.exports = Client

