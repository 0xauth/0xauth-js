const assert = require('assert')
const trx = require('../../../server/crypto/Trx')
const fixtures = require('../../fixtures')

describe('Trx Utils', function () {

  it('should sign a message', async function () {

    const signature = trx.sign(fixtures.authStr, fixtures.privateKey)
    let t = fixtures.signedToken.split(',')
    assert(signature === t[t.length -1])
  })

  it('should verify a signed message', async function () {

    let t = fixtures.signedToken.split(',')
    let isVerified = trx.verify(fixtures.authStr, t[t.length -1], fixtures.trxBase58Addr)
    assert(isVerified === true)

  })

})
