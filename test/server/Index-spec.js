const assert = require('assert')
const Auth = require('../../src/Auth')
const fixtures = require('../fixtures')

describe('Auth', function () {

  describe('getAuthorizationToken', function () {

    it('should generate an authToken', async function () {
      const authToken = Auth.getAuthorizationToken({
        issuer: fixtures.issuer,
        createdAt: fixtures.createdAt,
        randomString: fixtures.randomString
      })
      assert(authToken === fixtures.authToken)
    })

  })

  describe('signAndReturnToken', function () {

    describe('trx', function () {

      it('should return a signed token', async function () {
        const signedToken = Auth.signAndReturnToken(fixtures.authToken, 'trx', fixtures.privateKey)
        assert(signedToken === fixtures.trx.signedToken)
      })

    })
    describe('eth', function () {

      it('should return a typed v1 signed token', async function () {
        const signedToken = Auth.signAndReturnToken(fixtures.authToken, 'eth', fixtures.privateKey, 't1')
        assert(signedToken === fixtures.eth.signedToken_t1)
      })

      it('should return a personal signed token', async function () {
        const signedToken = Auth.signAndReturnToken(fixtures.authToken, 'eth', fixtures.privateKey)
        assert(signedToken === fixtures.eth.signedToken_ps)
      })

    })
  })

  describe('verifySignedToken', function () {

    describe('trx', function () {

      it('should verify a signed token', async function () {
        assert(Auth.verifySignedToken(fixtures.trx.signedToken))
      })

    })

    describe('eth', function () {

      it('should verify a typed signed token', async function () {
        assert(Auth.verifySignedToken(fixtures.eth.signedToken_t1))
      })

      it('should verify a personal signed token', async function () {
        assert(Auth.verifySignedToken(fixtures.eth.signedToken_ps))
      })

    })

  })

})
