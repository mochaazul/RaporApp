const jsonwebtoken = require('jsonwebtoken')

function signToken(payload) {
    return jsonwebtoken.sign(payload.process.env.JWT_SECRET)
}

function decodeToken(payload){
    return jsonwebtoken.decode(payload, process.env.JWT_SECRET)
}

module.exports = {
    signToken,
    decodeToken
}