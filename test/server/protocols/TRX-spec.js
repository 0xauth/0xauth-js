const assert = require('assert')
const AuthToken = require('../../../server/AuthToken')
const TRX = require('../../../server/protocol/TRX')
const fixtures = require('../../fixtures').TRX
const {stringToArray} = require('../../../server/utils')

describe('TRX Utils', function () {

  it('should sign a message', async function () {
    const signature = TRX.sign(fixtures.authToken, fixtures.privateKey)
    const signedToken = stringToArray(fixtures.signedToken)
    assert(signature === signedToken[6][0])
  })

  it('should verify a signed message', async function () {
    const signedToken = stringToArray(fixtures.signedToken)
    const authToken = AuthToken.from(signedToken).toString()
    let isVerified = TRX.verify(authToken, signedToken[6][0], fixtures.base58Addr)
    assert(isVerified === true)

  })

})
