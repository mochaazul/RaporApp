const Joi = require("joi")
const { ObjectID } = require("mongodb")

const tapelDb = require("../config/db").collection('tahunPelajaran')

class TahunPelajaranController {

  static async index(req, res, next) {
    try {
      let tapels = await tapelDb.find({}).toArray()
      res.send(tapels)
    } catch (err) {
      next(err)
    }
  }
  static async findById(req, res) {
    try {
      const id = req.params.id
      const data = await tapelDb.findOne({ _id: ObjectID(id) })

      data ? res.status(200).json(data) : res.status(500).json({ msg: 'Tahun pelajaran tidak ada.', status: 400 })

    } catch (err) {
      next(err)
    }
  }
  static async findByName(req, res, next) {
    try {
      const tapel = req.params.tapel
      const data = await tapelDb.findOne({ tapel })

      data ? res.status(200).json(data) : res.status(500).json({ msg: 'Tahun pelajaran tidak ada.', status: 400 })
    } catch (err) {
      next(err)
    }
  }

  static async insert(req, res, next) {
    try {
      const { tapel } = req.body
      // validation rules
      const schema = Joi.object({
        tapel: Joi.string()
          .pattern(/^\d{4}\D\d{4}$/)
          .required()
          .messages({
            'string.base': 'Tahun Pelajaran hanya boleh menggunakan tipe STRING',
            'string.pattern.base': "Tahun Pelajaran hanya boleh menggunakan format (tahun)/(tahun) Cth. 2020/2021",
            'any.required': 'Tahun Pelajaran tidak boleh kosong'
          })
      })

      // validate input
      let validator = schema.validate({ tapel })
      if (validator.error) throw ({ msg: validator.error.message, status: 400 })

      // check if tapel exists
      let tapelExist = await tapelDb.findOne({ tapel })
      if (tapelExist) throw ({ msg: `Tahun pelajaran ${tapel} sudah ada dalam database`, status: 400 })

      await tapelDb.insertOne({ tapel })
      res.status(200).json({ msg: "Tahun pelajaran berhasil di simpan" })

    } catch (err) {
      next(err)
    }

  }

  static async update(req, res, next) {
    try {
      const id = req.params.id
      const { tapel } = req.body
      // validation rules
      const schema = Joi.object({
        tapel: Joi.string()
          .pattern(/^\d{4}\D\d{4}$/)
          .required()
          .messages({
            'string.base': 'Tahun Pelajaran hanya boleh menggunakan tipe STRING',
            'string.pattern.base': "Tahun Pelajaran hanya boleh menggunakan format (tahun)/(tahun) Cth. 2020/2021",
            'any.required': 'Tahun Pelajaran tidak boleh kosong'
          })
      })

      // validate input
      let validator = schema.validate({ tapel })
      if (validator.error) throw ({ msg: validator.error.message, status: 400 })

      // check if tapel exists
      let tapelExist = await tapelDb.findOne({ tapel })
      if (tapelExist) throw ({ msg: `Tahun pelajaran ${tapel} sudah ada dalam database`, status: 400 })

      await tapelDb.updateOne({ _id: ObjectID(id) }, { $set: { tapel } })
      res.status(200).json({ msg: "Tahun pelajaran berhasil di update" })

    } catch (err) {
      next(err)
    }
  }

  static async delete(req, res, next) {
    try {
      const id = req.params.id
      const data = await tapelDb.findOneAndDelete({ _id: ObjectID(id) })
      if (!data.value) throw ({ msg: "Tapel tidak ditemukan", status: 400 })
      res.send(data)
    } catch (err) {
      next(err)
    }
  }

}

module.exports = TahunPelajaranController