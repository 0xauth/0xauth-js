const assert = require('assert')
const trx = require('../../../server/protocol/Trx')
const fixtures = require('../../fixtures')
const {tokenToArray, arrayToAuthToken} = require('../../../server/utils')

describe('Trx Utils', function () {

  it('should sign a message', async function () {
    const signature = trx.sign(fixtures.authToken, fixtures.privateKey)
    const signedToken = tokenToArray(fixtures.signedToken)
    assert(signature === signedToken[5][0])
  })

  it('should verify a signed message', async function () {
    const signedToken = tokenToArray(fixtures.signedToken)
    const authToken = arrayToAuthToken(signedToken.slice(0, 4))
    let isVerified = trx.verify(authToken, signedToken[5][0], fixtures.trxBase58Addr)
    assert(isVerified === true)

  })

})
