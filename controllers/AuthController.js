const { compareHash, makeHash } = require("../helpers/hash")
const { signToken } = require("../helpers/jwt")

const users = require("../config/db").collection('users')

class AuthController {

  static async login(req, res, next) {
    try {
      const { username, password } = req.body
      const user = await users.findOne({ username })
      if (!user) throw { msg: "Username/password salah", status: 400 }
      const passwordMatch = compareHash(password, user.password)
      // throw error jika username tidak ditemukan atau username ditemukan namun password salah
      if (!passwordMatch) throw { msg: "Username/password salah", status: 400 }

      // Jika kedua nya cocok, buatkan jwt token untuk client
      const token = signToken({
        _id: user._id,
        username: user.username,
        nama: user.nama,
        role: user.role
      })
      res.status(200).json({
        access_token: token
      })
    } catch (err) {
      next(err)
    }
  }
  static async register(req, res, next) {
    try {
      const { username, password,nama } = req.body
      const user = await users.insertOne({ username, password: makeHash(password), nama,role: 'admin' })

      if (!user) throw { msg: "Gagal membuat pengguna baru", status: 400 }
      const token = signToken({
        _id: user._id,
        username: user.username,
        nama: user.nama,
        role: user.role
      })

      res.status(200).json({access_token:token})
    } catch (err) {
      next(err)
    }
  }

}

module.exports = AuthController