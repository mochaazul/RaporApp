const jsonwebtoken = require('jsonwebtoken')

function signToken(payload) {
    return jsonwebtoken.sign(payload, process.env.JWT_SECRET, {expiresIn:process.env.TOKEN_EXPIRY || '8h'})
}

function decodeToken(payload){
    return jsonwebtoken.verify(payload, process.env.JWT_SECRET, {ignoreExpiration:false,maxAge:'3h'})
}

module.exports = {
    signToken,
    decodeToken
}