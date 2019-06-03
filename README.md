# 0xauth-js
A javascript library for the 0xAuth protocol

### ALPHA DEVELOPMENT, NOT READY YET FOR REAL WORLD USES

Implementation of the [0xAuth protocol](https://github.com/0xauth/0xauth)


## Install

Server sidee:
```
npm i --save 0xauth
```

Client side:
```
npm i 0xauth
cp node_modules/0xauth/dist/0xauth.js your/dest/folder/.
```

## Usage

Server side:

```
const 0xauth = require('0xauth')
const Auth = 0xauth.Auth
const authToken = new 0xauth.AuthToken({...})
...
```

Client side:

```
var client = new 0xauth.client()
client.init('trx', tronWeb)
// and/or
client.init('eth', web3)
...
```

## Server API

### Auth.getAuthorizationToken(params)

Params:
```
issuer         The RDNS of the app/service issuing the token
expireAt       (optional) The Linux timestamp at expiration
extraParams    Extra-parametes related with the app
```
For testing purposes, you can also pass:
```
createdAt      The Linux timestamp of creation
randomString   A 4 chars base64 string

```
while in a normal case those two values are generated.

Example:
```
const aWeekFromNow = Math.floor((Date.now() + 7 * 24 * 3600 * 1000) / 1000)

Auth.getAuthorizationToken({
    issuer: 'com.example.auth',
    expireAt: aWeekFromNow,
    extraParams: 'uid/233,active'
})
```
That would return something like:
```
0xAuth:1;com.example.auth;1559439788:1560044588;e3Jg;uid/233,active;de
```

### Auth.signAndReturnToken(authTokenString, chain, privateKey, format = 'ps')

`authTokenString` is the auth token to be signed in string format
`chain` is the abbreviation of one of the supported blockchains, for example `eth` or `trx`
`privateKey` is the private key to be used for the signature
`format` is the signature format (more info at [0xAuth protocol](https://github.com/0xauth/0xauth))

### Auth.verifySignedToken(signedTokenString)

`signedTokenString` is a signed token containing all the info necessary for the verification.


## Credits

  - [Francesco Sullo](https://francesco.sullo.co)

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2019 Francesco Sullo <francesco@sullo.co>
