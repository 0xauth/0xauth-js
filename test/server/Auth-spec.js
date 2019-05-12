const assert = require('assert')
const Auth = require('../../server/Auth')
const fixtures = require('../fixtures')

describe('Auth', function () {

  describe('getAuthorizationToken', function () {

    it('should generate an authToken from a TRX address in base58 format', async function () {
      const authToken = Auth.getAuthorizationToken({
        issuer: fixtures.TRX.issuer,
        createdAt: fixtures.TRX.createdAt,
        randomString: fixtures.TRX.randomString
      })
      assert(authToken === fixtures.TRX.authToken)
    })

  })

  describe('signAndReturnToken', function () {

    describe('trx', function () {

      it('should return a signed token', async function () {
        const signedToken = Auth.signAndReturnToken(fixtures.TRX.authToken, fixtures.TRX.trx, fixtures.TRX.privateKey)
        assert(signedToken === fixtures.TRX.signedToken)
      })

    })
    describe('eth', function () {

      it('should return a signed token', async function () {
        const signedToken = Auth.signAndReturnToken(fixtures.ETH.authToken, fixtures.ETH.eth, fixtures.ETH.privateKey)
        assert(signedToken === fixtures.ETH.signedToken)
      })

    })
  })

  describe('verifySignedToken', function () {

    describe('trx', function () {

      it('should verify a signed token', async function () {
        assert(Auth.verifySignedToken(fixtures.TRX.signedToken))
      })

    })

    describe('eth', function () {

      it('should verify a signed token', async function () {
        assert(Auth.verifySignedToken(fixtures.ETH.signedToken))
      })

    })

  })

})
