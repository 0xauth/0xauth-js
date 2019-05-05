// const eth = require('./crypto/eth')
const Trx = require('./protocol/Trx')
const {supportedChains} = require('./config')
const {arrayToAuthToken, tokenToArray, isRdns, randomHexString, isTimestamp} = require('./utils')

class Auth {

  constructor() {
    this.version = '1'
  }

  getAuthorizationToken(version, rdns, ts, extra) {
    if (typeof version !== 'string') {
      version = this.version
    }
    if (this.isSupportedVersion(version)) {
      throw new Error('A valid 0xAuth version is required.')
    }
    if (!isRdns(rdns)) {
      throw new Error('A valid rdns is required.')
    }
    if (!isTimestamp(ts)) {
      throw new Error('A valid timestamp is required.')
    }
    const auth = [
      ['0xAuth', version],
      rdns,
      (ts || parseInt(Date.now() / 1000)).toString(),
      extra || [randomHexString(2)]
    ]
    return arrayToAuthToken(auth)
  }

  signAndReturnToken(authToken, chain, privateKey) {
    chain = Auth.normalizeChain(chain)
    if (!chain) {
      throw new Error('A valid, supported chain is required.')
    }
    const address = Auth.getAddress(chain, privateKey)
    if (!address) {
      throw new Error('A valid address is required.')
    }
    const elems = tokenToArray(authToken)
    if (elems[0][1] === this.version) {
      return Auth.signAndReturnToken_v1(authToken, chain, address, privateKey)
    }
    return false
  }

  verifySignedToken(signedToken) {
    signedToken = tokenToArray(signedToken)
    if (signedToken[0][1] === this.version) {
      return Auth.verifySignedToken_v1(signedToken)
    }
    return false
  }

  static signAndReturnToken_v1(authToken, chain, address, privateKey) {
    let sig
    switch (chain) {
      case 'trx':
        sig = [Trx.sign(authToken, privateKey), 'tronweb', '1'].join(':')
        break
      case 'eth':

        break
      default:
        return false
    }
    return [authToken, [chain, address].join(':'), sig].join(';')
  }

  static verifySignedToken_v1(signedToken) {
    const authToken = arrayToAuthToken(signedToken.slice(0, 4))
    const [chain, address] = signedToken[4]
    const [signature, signer, version] = signedToken[5]
    switch (chain) {
      case 'trx':
        if (signer === 'tronweb' && version === '1') {
          return Trx.verify(authToken, signature, address)
        }
        break
      case 'eth':

        break
      default:
        return false
    }
    return false
  }

  static getAddress(chain, privateKey) {
    switch (chain) {
      case 'trx':
        return Trx.getAddress(privateKey)
      case 'eth':

        break
      default:

    }
  }

  static normalizeChain(chain) {
    if (typeof chain === 'string' && supportedChains.includes(chain.toLowerCase())) {
      return chain.toLowerCase()
    }
  }

  isSupportedVersion(version) {
    return version !== this.version
  }

}

module.exports = Auth
