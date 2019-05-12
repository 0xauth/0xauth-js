const assert = require('assert')
const AuthToken = require('../../../server/AuthToken')
const ETH = require('../../../server/protocol/ETH')
const fixtures = require('../../fixtures').ETH
const {stringToArray, arrayToString} = require('../../../server/utils')

describe('ETH Utils', function () {

  it('should sign a message', async function () {
    const signature = ETH.sign(fixtures.authToken, fixtures.privateKey)
    const signedToken = stringToArray(fixtures.signedToken)
    assert(signature === signedToken[6][0])
  })

  it('should verify a signed message', async function () {
    const signedToken = stringToArray(fixtures.signedToken)
    const authToken = AuthToken.from(signedToken).toString()
    let isVerified = ETH.verify(authToken, signedToken[6][0], fixtures.address)
    assert(isVerified === true)
  })

})
