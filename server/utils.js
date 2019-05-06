const crypto = require('crypto')

class Utils {

  static arrayToAuthToken(arr) {
    let tmp = []
    for (let k = 0; k < arr.length; k++) {
      let val = arr[k]
      if (!Array.isArray(val)) val = [val]
      for (let i = 0; i < val.length; i++) {
        val[i] = val[i].replace(/(\\|:|;)/g, '\\$1')
      }
      tmp.push(val.join(':'))
    }
    return tmp.join(';')
  }

  static tokenToArray(str) {
    var arr = []
    for (let elem of str.split(';')) {
      let val = elem.split(':')
      for (let i = 0; i < val.length; i++) {
        val[i] = val[i].replace(/\\:/g, ':').replace(/\\;/g, ';').replace(/\\\\/g, '\\')
      }
      arr.push(val)
    }
    return arr
  }

  static isRdns(rdns) {
    return /^[A-Za-x]{2,6}((?!-)\.[A-Za-z0-9-]{1,63}(?<!-))+$/.test(rdns)
  }

  static randomHexString(size) {
    return crypto.randomBytes(size).toString('hex')
  }

  static isTimestamp(ts) {
    ts = parseInt(ts)
    let d = new Date(ts * 1000)
    return parseInt(d.getTime() / 1000) === ts
  }
}

module.exports = Utils
