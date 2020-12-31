const jsonwebtoken = require('jsonwebtoken')

export function signToken(payload) {
    return jsonwebtoken.sign(payload.process.env.JWT_SECRET)
}

export function decodeToken(payload){
    return jsonwebtoken.decode(payload, process.env.JWT_SECRET)
}
