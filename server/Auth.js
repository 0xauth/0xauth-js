const ETH = require('./protocol/ETH')
const TRX = require('./protocol/TRX')
const {supportedChains} = require('./config')
const {stringToArray} = require('./utils')
const AuthToken = require('./AuthToken')

class Auth {

  static getAuthorizationToken(params) {

    var authToken = new AuthToken(params)
    return authToken.toString()
  }

  static signAndReturnToken(authTokenString, chain, privateKey, format) {
    if (AuthToken.isValid(authTokenString)) {
      chain = Auth.normalizeChain(chain)
      if (!chain) {
        throw new Error('A valid, supported chain is required.')
      }
      const address = Auth.getAddress(chain, privateKey)
      if (!address) {
        throw new Error('A valid address is required.')
      }
      return Auth.signAndReturnToken_v1(authTokenString, chain, address, privateKey, format)
    } else {
      throw new Error('Invalid auth token string.')
    }
  }

  static verifySignedToken(signedTokenString) {
    signedTokenString = stringToArray(signedTokenString)
    return Auth.verifySignedToken_v1(signedTokenString)
  }

  static signAndReturnToken_v1(authToken, chain, address, privateKey, format) {
    let sig
    switch (chain) {
      case 'trx':
        sig = [TRX.sign(authToken, privateKey), 'tronweb', 'ps'].join(':')
        break
      case 'eth':
        if (!format || format === 't1') {
          sig = [ETH.sign(authToken, privateKey), 'web3', 't1'].join(':')
        }
        break
    }
    if (!sig) {
      return false
    }
    return [authToken, [chain, address].join(':'), sig].join(';')
  }

  static verifySignedToken_v1(signedToken) {
    const authToken = AuthToken.from(signedToken).toString()
    const [chain, address] = signedToken[signedToken.length - 2]
    const [signature, signingTool, version] = signedToken[signedToken.length - 1]
    switch (chain) {
      case 'trx':
        if (signingTool === 'tronweb' && version === 'ps') {
          return TRX.verify(authToken, signature, address)
        }
        break
      case 'eth':
        if (signingTool === 'web3' && version === 't1') {
          return ETH.verify(authToken, signature, address)
        }
        break
      default:
    }
    return false
  }

  static getAddress(chain, privateKey) {
    switch (chain) {
      case 'trx':
        return TRX.getAddress(privateKey)
      case 'eth':
        return ETH.getAddress(privateKey)
      default:

    }
  }

  static normalizeChain(chain) {
    if (typeof chain === 'string' && supportedChains.includes(chain.toLowerCase())) {
      return chain.toLowerCase()
    }
  }

}

module.exports = Auth
