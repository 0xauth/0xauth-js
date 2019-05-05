const assert = require('assert')
const Auth = require('../../server/Auth')
const fixtures = require('../fixtures')

describe('Auth', function () {

  let auth

  before(function() {
    auth = new Auth
  })

  describe('getAuthorizationToken', function () {

    describe('trx', function () {

      it('should generate an authToken from an address in base58 format', async function () {
        const authToken = auth.getAuthorizationToken(null, fixtures.rdns, fixtures.ts, fixtures.extra)
        assert(authToken === fixtures.authToken)
      })

    })

  })

  describe('signAndReturnToken', function () {

    describe('trx', function () {

      it('should return a signed token', async function () {
        const signedToken = auth.signAndReturnToken(fixtures.authToken, fixtures.trx, fixtures.privateKey)
        assert(signedToken === fixtures.signedToken)
      })

    })
  })

  describe('verifySignedToken', function () {

    describe('trx', function () {

      it('should verify a signed token', async function () {
        assert(auth.verifySignedToken(fixtures.signedToken))
      })

    })

  })

})
