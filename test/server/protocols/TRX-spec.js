const assert = require('assert')
const TRX = require('../../../src/protocol/Trx')
const fixtures = require('../../fixtures')

describe('TRX Utils', function () {

  it('should sign a message', async function () {
    const signature = TRX.sign(fixtures.hexString, fixtures.privateKey, 'ps')
    assert(signature === fixtures.trx.signedHexString)
  })

  it('should verify a signed message passing a base58 address', async function () {
    let isVerified = TRX.verify(fixtures.hexString, fixtures.trx.signedHexString, fixtures.trx.base58Addr, 'ps')
    assert(isVerified === true)
  })

  it('should verify a signed message passing an hex address', async function () {
    let isVerified = TRX.verify(fixtures.hexString, fixtures.trx.signedHexString, fixtures.trx.hexAddr, 'ps')
    assert(isVerified === true)
  })

})
