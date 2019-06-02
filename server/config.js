const supportedChains = ['eth', 'trx']

module.exports = {

  supportedChains,

  normalizeChain: chain => {
    if (typeof chain === 'string' && supportedChains.includes(chain.toLowerCase())) {
      return chain.toLowerCase()
    }
  }

}
