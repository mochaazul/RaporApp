const bcrypt = require('bcrypt');

function makeHash(payload){
    return bcrypt.hashSync(payload, +process.env.SALT || 10)
}

function compareHash(payload,hashed) {
    return bcrypt.compareSync(payload, +process.env.SALT || 10)
}

module.exports = {
    makeHash,
    compareHash
}