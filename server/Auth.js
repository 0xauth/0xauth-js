const Trx = require('./crypto/Trx')
// const eth = require('./crypto/eth')
const constants = require('./constants')
const {supportedChains} = require('./config')

class Auth {

  constructor() {
    this['0xAuth'] = '1'
  }

  generateAuthStr(rdns, chain, address, ts = false) {
    if (!Auth.isRdns(rdns)) {
      throw new Error('A valid rdns is required.')
    }
    chain = Auth.normalizeChain(chain)
    if (!chain) {
      throw new Error('A valid, supported chain is required.')
    }
    address = Auth.normalizeAddress(chain, address)
    if (!address) {
      throw new Error('A valid address is required.')
    }
    const auth = {
      '0xAuth': this['0xAuth'],
      rdns,
      ts: (ts || parseInt(Date.now() / 1000)).toString(),
      addr: [chain, address]
    }
    return Auth.objToString(auth)
  }

  signAndReturnToken(authStr, privateKey) {
    const elems = Auth.stringToObj(authStr)
    if (elems['0xAuth'] === this['0xAuth']) {
      return Auth.signAndReturnToken_v1(authStr, elems.addr[0], privateKey)
    }
    return false
  }

  verifySignedToken(signedToken) {
    const elems = Auth.stringToObj(signedToken)
    if (elems['0xAuth'] === this['0xAuth']) {
      return Auth.verifySignedToken_v1(signedToken, elems)
    }
    return false
  }

  static signAndReturnToken_v1(authStr, chain, privateKey) {
    let sig
    switch (chain) {
      case 'trx':
        sig = ['tronweb', '1', Trx.sign(authStr, privateKey)].join(',')
        break
      case 'eth':

        break
      default:
        return false
    }
    return [authStr, 'sig:' + sig].join(';')
  }

  static verifySignedToken_v1(signedToken, elems) {
    const authStr = signedToken.split(';sig:')[0]
    const [chain, address] = elems.addr
    const [signer, version, signature] = elems.sig
    switch (chain) {
      case 'trx':
        if (signer === 'tronweb' && version === '1') {
          return Trx.verify(authStr, signature, address)
        }
        break
      case 'eth':

        break
      default:
        return false
    }
    return false
  }

  static objToString(obj) {
    let str = ''
    for (let key in obj) {
      let val = obj[key]
      str += (str ? ';' : '') + [key, Array.isArray(val) ? val.join(',') : val].join(':')
    }
    return str
  }

  static stringToObj(str) {
    var obj = {}
    for (let elem of str.split(';')) {
      let keyValue = elem.split(':')
      let val = keyValue[1]
      obj[keyValue[0]] = /,/.test(val) ? val.split(',') : val
    }
    return obj
  }

  static normalizeAddress(chain, address) {
    switch (chain) {
      case 'trx':
        return Trx.normalizeAddress(address)
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

  static isRdns(rdns) {
    return /^[A-Za-x]{2,6}((?!-)\.[A-Za-z0-9-]{1,63}(?<!-))+$/.test(rdns)
  }

}

module.exports = new Auth
