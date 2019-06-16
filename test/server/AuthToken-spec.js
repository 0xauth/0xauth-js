const assert = require('assert')
const AuthToken = require('../../src/AuthToken')
const fixtures = require('../fixtures')

describe('AuthToken', function () {

  let authToken

  before(function () {

    authToken = new AuthToken({
      issuer: fixtures.issuer,
      createdAt: fixtures.createdAt,
      randomString: fixtures.randomString
    })
  })

  describe('#constructor', function () {

      it('should instantiate an authToken', async function () {
        assert(JSON.stringify(authToken.data) === fixtures.json)
      })

  })

  describe('#toString', function () {

    it('should return an authToken as a string', async function () {
      assert(authToken.toString() === fixtures.authToken)
    })
  })

  describe('#from', function () {

    it('should return an authToken array from a string', async function () {
      assert(AuthToken.from(fixtures.authToken).toString() === fixtures.authToken)
    })

    it('should retrieve an (unverified) unsigned token from a (TRX) signed token', function () {
      assert(AuthToken.from(fixtures.trx.signedToken).toString() === fixtures.authToken)
    })

  })

  describe('#isValid', function () {

    it('should verify that a token is valid', function () {
      assert(AuthToken.isValid(fixtures.authToken))
    })

  })

})
