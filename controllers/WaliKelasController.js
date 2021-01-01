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

  static async findById(req, res) {
    try {
      const id = req.params.id
      const data = await wakelDB.findOne({ _id: ObjectID(id) })

      data ? res.status(200).json(data) : res.status(500).json({ err: 'Wali kelas tidak ditemukan.', status: 400 })

    } catch (err) {
      next(err)
    }
  }

  static async findByName(req, res, next) {
    try {
      const { nama } = req.params
      const data = await wakelDB.findOne({ nama })

      data ? res.status(200).json(data) : res.status(500).json({ err: 'Walikelas tidak ditemukan.', status: 400 })
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

      // validate input
      let validator = schema.validate({ nama, kelas })
      if (validator.error) throw ({ msg: validator.error.message, status: 400 })

      // check if tapel exists
      let wakelExists = await wakelDB.findOne({ nama })
      if (wakelExists) throw ({ msg: `Walikelas dengan nama ${nama} sudah ada dalam database`, status: 400 })

      await wakelDB.insertOne({ nama, kelas })
      res.status(200).json({ msg: "Walikelas berhasil di tambahkan" })

    } catch (err) {
      next(err)
    }

  }

  static async update(req, res, next) {
    try {
      const { nama } = req.body
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
      let validator = schema.validate({ nama })
      if (validator.error) throw ({ msg: validator.error.message, status: 400 })

      // check if tapel exists
      let wakelExists = await wakelDB.findOne({ nama })
      if (wakelExists) throw ({ msg: `Walikelas dengan nama ${nama} sudah ada dalam database`, status: 400 })



      await wakelDB.insertOne({ nama })
      res.status(200).json({ msg: "Walikelas berhasil di tambahkan" })

    } catch (err) {
      next(err)
    }
  }

  static async delete(req, res, next) {
    try {
      const id = req.params.id
      const data = await wakelDB.findOneAndDelete({ _id: ObjectID(id) })
      if (!data.value) throw ({ msg: "Walikelas tidak ditemukan", status: 400 })
      res.send(data)
    } catch (err) {
      next(err)
    }
  }

}

module.exports = WaliKelasController