const {
  isRdns,
  randomBase64String,
  isTimestamp,
  stringToArray,
  arrayToString,
  toArray,
  keccak256
} = require('./Utils')

class AuthToken {
  // unsigned auth token

  constructor(params) {
    let {
      issuer,
      createdAt,
      expireAt,
      randomString,
      extraParams
    } = params

    if (!isRdns(issuer)) {
      throw new Error('Invalid reverse domain name.')
    }
    const timestamps = []
    if (createdAt && !isTimestamp(createdAt)) {
      // This case is here only for deterministic testing.
      // In production usage, the createdAt param should never be passed.
      throw new Error('Invalid creation timestamp.')
    } else if (!createdAt) {
      createdAt = Math.floor(Date.now() / 1000)
    }
    timestamps.push(createdAt.toString())
    if (expireAt) {
      if ((!isTimestamp(expireAt) || parseInt(expireAt) <= parseInt(createdAt))) {
        throw new Error('Invalid expiration timestamp.')
      } else {
        timestamps.push(expireAt.toString())
      }
    }
    if (!randomString) {
      randomString = [randomBase64String(2)]
    } else {
      // This case is here only for deterministic testing.
      // In production usage, the string should never be passed.
      randomString = toArray(randomString).slice(0, 1)
      if (!/^\w{4}$/.test(randomString[0])) {
        throw new Error('Invalid string passed')
      }
    }
    this.data = [
      ['0xAuth', '1'],
      toArray(issuer),
      timestamps,
      toArray(randomString)
    ]
    if (extraParams) {
      if (!Array.isArray(extraParams)) {
        extraParams = extraParams.split(':')
      }
      for (let e of extraParams) {
        if (/[:;]+/.test(e)) {
          throw new Error('Invalid extra parameter passed.')
        }
      }
      this.data.push(extraParams)
    }
    this.data.push([
      keccak256(this.toString()).substring(0,1)
    ])
  }

  toString() {
    return arrayToString(this.data)
  }

  static from(tokenArray) {
    if (!Array.isArray(tokenArray)) {
      tokenArray = stringToArray(tokenArray)
    }
    const haxExtraParams = !(tokenArray.length % 2)
    return new AuthToken({
      issuer: tokenArray[1][0],
      createdAt: tokenArray[2][0],
      expireAt: tokenArray[2][1],
      randomString: tokenArray[3][0],
      extraParams: haxExtraParams ? tokenArray[4] : undefined
    })
  }

  static isValid(tokenString) {
    return tokenString === AuthToken.from(tokenString).toString()
  }

}

module.exports = AuthToken
