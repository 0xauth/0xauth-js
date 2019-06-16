const assert = require('assert')
const ETH = require('../../../src/protocol/Eth')
const fixtures = require('../../fixtures')

describe('ETH Utils', function () {

  describe('personal_sign', function () {

    it('should sign a message', async function () {
      const signature = ETH.sign(fixtures.hexString, fixtures.privateKey, 'ps')
      assert(signature === fixtures.eth.signedHexString_ps)
    })

    it('should verify a signed message', async function () {
      let isVerified = ETH.verify(fixtures.hexString, fixtures.eth.signedHexString_ps, fixtures.eth.address, 'ps')
      assert(isVerified === true)
    })

  })

  describe('typed signature', function () {

    it('should sign a message', async function () {
      const signature = ETH.sign(fixtures.hexString, fixtures.privateKey, 't1')
      assert(signature === fixtures.eth.signedHexString_t1)
    })

    it('should verify a signed message', async function () {
      let isVerified = ETH.verify(fixtures.hexString, fixtures.eth.signedHexString_t1, fixtures.eth.address, 't1')
      assert(isVerified === true)
    })

  })

})
