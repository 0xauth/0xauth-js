module.exports = {

  trx: {
    MESSAGE_HEADER: '\x19TRON Signed Message:\n32',
    ADDRESS_SIZE: 34,
    ADDRESS_PREFIX: "41",
    ADDRESS_PREFIX_BYTE: 0x41,
    ADDRESS_PREFIX_REGEX: /^(41)/
  },

  eth: {
    MESSAGE_HEADER: '\x19Ethereum Signed Message:\n32'
  }

}
