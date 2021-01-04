const jsonwebtoken = require('jsonwebtoken')

function signToken(payload) {
    return jsonwebtoken.sign(payload, process.env.JWT_SECRET, {expiresIn:process.env.TOKEN_EXPIRY || '2d'})
}

function decodeToken(payload){
    return jsonwebtoken.verify(payload, process.env.JWT_SECRET, {ignoreExpiration:false, maxAge:'2d'})
}

module.exports = {
    signToken,
    decodeToken
}