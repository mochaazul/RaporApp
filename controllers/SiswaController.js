const siswaDB = require("../config/db").collection('siswa')

class SiswaController {

  static async index(req, res, next) {
    try {
      const siswas = await siswaDB.find().toArray()
      res.status(200).json(siswas)
    } catch (err) {
      next(err)
    }
  }
}
module.exports = SiswaController