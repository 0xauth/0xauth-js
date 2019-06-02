const assert = require('assert')
const AuthToken = require('../../../server/AuthToken')
const ETH = require('../../../server/protocol/ETH')
const fixtures = require('../../fixtures').ETH
const {stringToArray, arrayToString} = require('../../../server/utils')

describe('ETH Utils', function () {

  describe('personal_sign', function () {

    it('should sign a message', async function () {
      const signature = ETH.sign(fixtures.authToken, fixtures.privateKey, 'ps')
      const signedToken_ps = stringToArray(fixtures.signedToken_ps)
      assert(signature === signedToken_ps[6][0])
    })

    it('should verify a signed message', async function () {
      const signedToken = stringToArray(fixtures.signedToken_ps)
      const authToken = AuthToken.from(signedToken).toString()
      let isVerified = ETH.verify(authToken, signedToken[6][0], fixtures.address, 'ps')
      assert(isVerified === true)
    })

  })

  describe('typed signature', function () {

    it('should sign a message', async function () {
      const signature = ETH.sign(fixtures.authToken, fixtures.privateKey, 't1')
      const signedToken = stringToArray(fixtures.signedToken_t1)
      assert(signature === signedToken[6][0])
    })

    it('should verify a signed message', async function () {
      const signedToken = stringToArray(fixtures.signedToken_t1)
      const authToken = AuthToken.from(signedToken).toString()
      let isVerified = ETH.verify(authToken, signedToken[6][0], fixtures.address, 't1')
      assert(isVerified === true)
    })

  })



})
