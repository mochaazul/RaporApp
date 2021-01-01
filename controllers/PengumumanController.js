const Joi = require("joi")
const { ObjectID } = require("mongodb")

const pengumumanDB = require("../config/db").collection('pengumuman')


class PengumumanController {

  static async index(req, res, next) {
    try {
      let pengumuman = await pengumumanDB.find({}).toArray()
      res.status(200).json(pengumuman)
    } catch (err) {
      next(err)
    }
  }

  static async findById(req, res, next) {
    try {
      const id = req.params.id
      const pengumuman = await pengumumanDB.findOne({ _id: ObjectID(id) })

      if (!pengumuman) throw { msg: 'Pengumuman tidak ditemukan.', status: 400 }

      res.status(200).json(pengumuman)
    } catch (err) {
      next(err)
    }
  }


  static async insert(req, res, next) {
    try {
      const { title, body } = req.body

      const schema = Joi.object({
        title: Joi.string()
          .required()
          .messages({
            'any.required': 'Judul tidak boleh kosong'
          }),
        body: Joi.string()
          .required()
          .messages({
            'any.required': 'Isi pengumuman tidak boleh kosong'
          })
      })



      let created_at = Date.now()
      let created_by = req.loggedInUser.nama
      // validate input
      let validator = schema.validate({ title, body })
      if (validator.error) throw ({ msg: validator.error.message, status: 400 })

      await pengumumanDB.insertOne({ title, body, created_at, created_by })
      res.status(200).json({ msg: "Pengumuman berhasil di tambahkan" })

    } catch (err) {
      next(err)
    }

  }

  static async update(req, res, next) {
    try {
      const { id } = req.params
      const { title, body } = req.body
      // validation rules
      const schema = Joi.object({
        title: Joi.string(),
        body: Joi.string()
      })

      console.log(id);

      let updated_at = Date.now()
      let updated_by = req.loggedInUser.nama

      // validate input
      let validator = schema.validate({ title, body })
      if (validator.error) throw ({ msg: validator.error.message, status: 400 })

      await pengumumanDB.findOneAndUpdate({ _id: ObjectID(id) }, { $set: { title, body, updated_at, updated_by } })
      res.status(200).json({ msg: "Pengumuman berhasil di perbaharui" })

    } catch (err) {
      next(err)
    }
  }

  static async delete(req, res, next) {
    try {
      const id = req.params.id
      const data = await pengumumanDB.findOneAndDelete({ _id: ObjectID(id) })
      if (!data.value) throw ({ msg: "Pengumuman tidak ditemukan", status: 400 })
      res.status(200).json({msg:'Pengumuman berhasil di hapus', data:data.value})
    } catch (err) {
      next(err)
    }
  }

}

module.exports = PengumumanController