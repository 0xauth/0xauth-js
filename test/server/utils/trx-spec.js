const assert = require('assert')
const trx = require('../../../server/utils/trx')
const fixtures = require('../../fixtures')

describe('Trx Utils', function () {

  it('should sign a message', async () => {

    const signature = trx.sign(fixtures.trx.message, fixtures.trx.privateKey)
    assert(signature === fixtures.trx.signature)
  })

  it('should verify a signed message', async () => {

    let isVerified = trx.verify(fixtures.trx.message, fixtures.trx.signature, fixtures.trx.base58Addr)
    assert(isVerified === true)

    isVerified = trx.verify(fixtures.trx.message, fixtures.trx.signature, fixtures.trx.hexAddr)
    assert(isVerified === true)
  })

})
