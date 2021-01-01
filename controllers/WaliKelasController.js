const Joi = require("joi")
const { ObjectID } = require("mongodb")

const wakelDB = require("../config/db").collection('waliKelas')

class WaliKelasController {

  static async index(req, res, next) {
    try {
      let tapels = await wakelDB.find({}).toArray()
      res.send(tapels)
    } catch (err) {
      next(err)
    }
  }

  static async findById(req, res, next) {
    try {
      const id = req.params.id
      const walikelas = await wakelDB.findOne({ _id: ObjectID(id) })

      if (!walikelas) throw { msg: 'Wali kelas tidak ditemukan.', status: 400 }

      res.status(200).json(walikelas)
    } catch (err) {
      next(err)
    }
  }

  // TODO : Findbyname still not working,
  static async findByName(req, res, next) {
    try {
      const { nama } = req.params
      const walikelas = await wakelDB.find({ nama: new RegExp('^' + nama + '$', 'i') })

      // if (!walikelas) throw { msg: 'Walikelas tidak ditemukan.', status: 400 }
      res.status(200).json(walikelas.toArray())

    } catch (err) {
      next(err)
    }
  }

  static async insert(req, res, next) {
    try {
      const { nama, kelas } = req.body
      // validation rules
      const schema = Joi.object({
        nama: Joi.string()
          .required()
          .messages({
            'any.required': 'Nama tidak boleh kosong'
          }),
        kelas: Joi.string()
          .required()
          .messages({
            'any.required': 'Kelas tidak boleh kosong'
          })
      })

      let created_at = Date.now()
      let created_by = req.loggedInUser.nama

      // validate input
      let validator = schema.validate({ nama, kelas })
      if (validator.error) throw ({ msg: validator.error.message, status: 400 })

      // check if tapel exists
      let wakelExists = await wakelDB.findOne({ nama })
      if (wakelExists) throw ({ msg: `Walikelas dengan nama ${nama} sudah ada dalam database`, status: 400 })

      await wakelDB.insertOne({ nama, kelas, created_at, created_by })
      res.status(200).json({ msg: "Walikelas berhasil di tambahkan" })

    } catch (err) {
      next(err)
    }

  }

  static async update(req, res, next) {
    try {
      const { id } = req.params
      const { nama, kelas } = req.body
      // validation rules
      const schema = Joi.object({
        nama: Joi.string()
          .required()
          .messages({
            'any.required': 'Nama tidak boleh kosong'
          }),
        kelas: Joi.string()
          .required()
          .messages({
            'any.required': 'Kelas tidak boleh kosong'
          })
      })

      // validate input
      let validator = schema.validate({ nama, kelas })
      if (validator.error) throw ({ msg: validator.error.message, status: 400 })

      // check if tapel exists
      let wakelExists = await wakelDB.findOne({ nama })
      if (wakelExists) throw ({ msg: `Walikelas dengan nama ${nama} sudah ada dalam database`, status: 400 })

      let kelasExist = await wakelDB.findOne({ kelas })
      if (wakelExists) throw ({ msg: `Kelas ${kelas}, sudah memiliki walikelas , ${wakelExists.nama}` })

      let updated_at = Date.now()
      let updated_by = req.loggedInUser.nama

      await wakelDB.findOneAndUpdate({ _id: ObjectID(id) }, { $set: { nama, kelas, updated_at, updated_by } })
      res.status(200).json({ msg: "Walikelas berhasil di perbaharui" })

    } catch (err) {
      next(err)
    }
  }

  static async delete(req, res, next) {
    try {
      const id = req.params.id
      const data = await wakelDB.findOneAndDelete({ _id: ObjectID(id) })
      if (!data.value) throw ({ msg: "Walikelas tidak ditemukan", status: 400 })
      res.status(200).json({ msg: 'Walikelas berhasil dihapus', data: data.value })
    } catch (err) {
      next(err)
    }
  }

}

module.exports = WaliKelasController