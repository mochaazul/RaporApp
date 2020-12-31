const pengumumanDB = require("../config/db").collection('pengumuman')

// TODO INSERT Menggunakan id dari siapa yg create

class PengumumanController {

  static async index(req, res) {
    let pengumuman = await pengumumanDB.find({}).toArray()
    res.send(pengumuman)
  }

  static async findById(req, res) {
    try {
      const id = req.params.id
      const data = await pengumumanDB.findOne({ _id: ObjectID(id) })

      data ? res.status(200).json(data) : res.status(500).json({ err: 'Pengumuman tidak ditemukan.' })

    } catch (err) {
      console.log(err);
    }
  }


  static async insert(req, res) {
    try {
      const { title, body } = req.body
      // validation rules
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

      let created_at = new Date().now()

      // validate input
      let validator = schema.validate({ title, body })
      if (validator.error) throw (validator.error.message)

      await pengumumanDB.insertOne({ title, body, created_at })
      res.status(200).json({ msg: "Pengumuman berhasil di tambahkan" })

    } catch (err) {
      console.log(err);
    }

  }

  static async update(req, res) {
    try {
      const { title, body } = req.body
      // validation rules
      const schema = Joi.object({
        title: Joi.string(),
        body: Joi.string()          
      })

      let updated_at = new Date().now()

      // validate input
      let validator = schema.validate({ title, body })
      if (validator.error) throw (validator.error.message)

      await pengumumanDB.insertOne({ title, body, updated_at })
      res.status(200).json({ msg: "Pengumuman berhasil di perbaharui" })

    } catch (err) {
      console.log(err);
    }
  }

  static async delete(req, res) {
    try {
      const id = req.params.id
      const data = await pengumumanDB.findOneAndDelete({ _id: ObjectID(id) })
      if (!data.value) throw ({ msg: "Pengumuman tidak ditemukan" })
      res.send(data)
    } catch (err) {
      console.log(err);
    }
  }

}

module.exports = PengumumanController