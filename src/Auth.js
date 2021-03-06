const ETH = require('./protocol/Eth')
const TRX = require('./protocol/Trx')
const {stringToArray, normalizeChain, toHex, keccak256} = require('./Utils')
const AuthToken = require('./AuthToken')

class Auth {

  static getAuthorizationToken(params) {

    var authToken = new AuthToken(params)
    return authToken.toString()
  }

  static signAndReturnToken(authTokenString, chain, privateKey, format = 'ps') {
    if (AuthToken.isValid(authTokenString)) {
      chain = normalizeChain(chain)
      if (!chain) {
        throw new Error('A valid, supported chain is required.')
      }
      const address = Auth.getAddress(chain, privateKey)
      if (!address) {
        throw new Error('A valid address is required.')
      }
      let hexString = toHex(authTokenString)
      let sig
      switch (chain) {
        case 'trx':
          sig = [TRX.sign(hexString, privateKey), 'tronweb', format].join(':')
          break
        case 'eth':
          sig = [ETH.sign(hexString, privateKey, format), 'web3', format].join(':')
          break
      }
      if (!sig) {
        return false
      }
      return [authTokenString, [chain, address].join(':'), sig].join(';')
    } else {
      throw new Error('Invalid auth token string.')
    }
  }

  static verifySignedToken(signedTokenString) {
    signedTokenString = stringToArray(signedTokenString)
    const authTokenString = AuthToken.from(signedTokenString).toString()
    let hexString = toHex(authTokenString)
    const [chain, address] = signedTokenString[signedTokenString.length - 2]
    const [signature, signingTool, version] = signedTokenString[signedTokenString.length - 1]
    switch (chain) {
      case 'trx':
        if (signingTool === 'tronweb' && version === 'ps') {
          return TRX.verify(hexString, signature, address)
        }
        break
      case 'eth':
        if (signingTool === 'web3' && /(t1|ps)/.test(version)) {
          return ETH.verify(hexString, signature, address, version)
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
}

module.exports = Auth
