const assert = require('assert')
const auth = require('../../server/Auth')
const fixtures = require('../fixtures')

describe('Auth', function () {

  describe('generateAuthStr', function () {

    describe('trx', function () {

      it('should generate an authStr from an address in base58 format', async function () {
        const authStr = auth.generateAuthStr(fixtures.rdns, fixtures.trx, fixtures.trxBase58Addr, fixtures.ts)
        assert(authStr === fixtures.authStr)
      })

      it('should generate an authStr from an address in hex format', async function () {
        const authStr = auth.generateAuthStr(fixtures.rdns, fixtures.trx, fixtures.trxHexAddr, fixtures.ts)
        assert(authStr === fixtures.authStr)
      })
    })

  })

  describe('signAndReturnToken', function () {

    describe('trx', function () {

      it('should return a signed token', async function () {
        const signedToken = auth.signAndReturnToken(fixtures.authStr, fixtures.privateKey)
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
