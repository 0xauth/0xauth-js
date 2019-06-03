const crypto = require('crypto')
const {supportedChains} = require('./config')
var SHA256 = require("crypto-js/sha256");

class Utils {

  static arrayToString(arr) {
    let tmp = []
    for (let k = 0; k < arr.length; k++) {
      let val = arr[k]
      tmp.push(val.join(':'))
    }
    return tmp.join(';')
  }

  static stringToArray(str) {
    var arr = []
    for (let elem of str.split(';')) {
      let val = elem.split(':')
      arr.push(val)
    }
    return arr
  }

  static checksum(str) {
    return SHA256(str).toString().substring(0,2)
  }

  static toArray(val) {
    if (!Array.isArray(val)) {
      val = [val]
    }
    return val
  }

  static isRdns(rdns) {
    return /^[A-Za-x]{2,6}((?!-)\.[A-Za-z0-9-]{1,63}(?<!-))+$/.test(rdns)
  }

  static randomBase64String() {
    return crypto.randomBytes(8).toString('base64').substring(0, 4)
  }

  static isTimestamp(ts) {
    ts = parseInt(ts)
    let d = new Date(ts * 1000)
    return parseInt(d.getTime() / 1000) === ts
  }

  static toHex(string, format = 'utf8') {
    let buf = Buffer.from(string, format)
    return '0x' + buf.toString('hex')
  }

  static fromHex(string, format = 'utf8') {
    let buf = Buffer.from(string, 'hex')
    return buf.toString('utf8')
  }


  static normalizeChain(chain) {
    if (typeof chain === 'string' && supportedChains.includes(chain.toLowerCase())) {
      return chain.toLowerCase()
    }
  }

}

module.exports = Utils
