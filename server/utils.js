const {utils} = require('ethers')

module.exports.keccak256 = utils.keccak256
module.exports.toUtf8Bytes = utils.toUtf8Bytes
module.exports.recoverAddress = utils.recoverAddress
module.exports.SigningKey = utils.SigningKey

const crypto = require('crypto')

function isHex(string) {
  return (typeof string === 'string'
      && !isNaN(parseInt(string, 16))
      && /^(0x|)[a-fA-F0-9]+$/.test(string))
}

function isHexChar(c) {
  if ((c >= 'A' && c <= 'F') ||
      (c >= 'a' && c <= 'f') ||
      (c >= '0' && c <= '9')) {
    return 1
  }
  return 0
}

function hexChar2byte(c) {
  let d

  if (c >= 'A' && c <= 'F')
    d = c.charCodeAt(0) - 'A'.charCodeAt(0) + 10
  else if (c >= 'a' && c <= 'f')
    d = c.charCodeAt(0) - 'a'.charCodeAt(0) + 10
  else if (c >= '0' && c <= '9')
    d = c.charCodeAt(0) - '0'.charCodeAt(0)

  if (typeof d === 'number')
    return d
  else
    throw new Error('The passed hex char is not a valid hex char')
}

function hexStr2byteArray(str) {
  if (typeof str !== 'string')
    throw new Error('The passed string is not a string')

  const byteArray = Array()
  let d = 0
  let j = 0
  let k = 0

  for (let i = 0; i < str.length; i++) {
    const c = str.charAt(i)

    if (isHexChar(c)) {
      d <<= 4
      d += hexChar2byte(c)
      j++

      if (0 === (j % 2)) {
        byteArray[k++] = d
        d = 0
      }
    } else
      throw new Error('The passed hex char is not a valid hex string')
  }

  return byteArray
}

function arrayToString(arr) {
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

function stringToArray(str) {
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

function isRdns(rdns) {
  return /^[A-Za-x]{2,6}((?!-)\.[A-Za-z0-9-]{1,63}(?<!-))+$/.test(rdns)
}

function randomHexString(size) {
  return crypto.randomBytes(size).toString('hex')
}

function isTimestamp(ts) {
  ts = parseInt(ts)
  let d = new Date(ts * 1000)
  return parseInt(d.getTime()/1000) === ts
}

module.exports.isHex = isHex
module.exports.isHexChar = isHexChar
module.exports.hexChar2byte = hexChar2byte
module.exports.hexStr2byteArray = hexStr2byteArray
module.exports.arrayToAuthToken = arrayToString
module.exports.tokenToArray = stringToArray
module.exports.isRdns = isRdns
module.exports.randomHexString = randomHexString
module.exports.isTimestamp = isTimestamp

