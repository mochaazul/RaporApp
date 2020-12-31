const bcrypt = require('bcrypt');

export function makeHash(payload){
    return bcrypt.hashSync(payload, +process.env.SALT || 10)
}

export function compareHash(payload,hashed) {
    return bcrypt.compareSync(payload, +process.env.SALT || 10)
}