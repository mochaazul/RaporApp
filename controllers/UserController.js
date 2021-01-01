const Joi = require("joi")
const { ObjectID } = require("mongodb")
const { makeHash } = require("../helpers/hash")

const userDB = require("../config/db").collection('users')

class UserController {

  static async index(req, res) {
    let users = await userDB.find({}).toArray()
    res.send(users)
  }

  static async findById(req, res) {
    try {
      const id = req.params.id
      const data = await userDB.findOne({ _id: ObjectID(id) })
      data ? res.status(200).json(data) : res.status(500).json({ err: 'User tidak ditemukan.' })

    } catch (err) {
      console.log(err);
    }
  }

  static async insert(req, res) {
    try {
      const { username, nama, password } = req.body
      let role = req.body.role

      // validation rules
      const schema = Joi.object({
        nama: Joi.string()
          .required()
          .messages({
            'any.required': 'Nama tidak boleh kosong'
          }),
        username: Joi.string()
          .min(4)
          .required()
          .messages({
            'any.required': 'Username tidak boleh kosong',
            'string.min': "Username harus melebihi 4 karakter"
          }),
        password: Joi.string()
          .min(6)
          .required()
          .messages({
            "string.min": 'Password harus melebih 6 karakter',
            'any.required': 'Password tidak boleh kosong'
          })
      })

      // validate input
      let validator = schema.validate({ nama, username, password })
      if (validator.error) throw (validator.error.message)

      let hashedPassword = makeHash(password)

      // check if tapel exists
      let wakelExists = await userDB.findOne({ username })
      if (wakelExists) throw ({ msg: `Username ${username} telah digunakan.` })

      if (!role) role = "admin"

      await userDB.insertOne({
        nama,
        username,
        role,
        password: hashedPassword,
        createdAt: Date.now()
      })

      res.status(200).json({ msg: `User dengan role ${role} berhasil dibuat.` })

    } catch (err) {
      console.log(err);
    }

  }

  static async update(req, res) {
    try {
      const id = req.params.id
      const { username, nama, role } = req.body

      // validation rules
      const schema = Joi.object({
        nama: Joi.string()
          .required()
          .messages({
            'any.required': 'Nama tidak boleh kosong'
          }),
        username: Joi.string()
          .min(4)
          .required()
          .messages({
            'any.required': 'Username tidak boleh kosong',
            'string.min': "Username harus melebihi 4 karakter"
          })
      })

      // validate input
      let validator = schema.validate({ nama, username })
      if (validator.error) throw (validator.error.message)

      await userDB.findOneAndUpdate({ _id: ObjectID(id) }, {
        $set: {
          nama,
          username,
          role: role ? role : "admin",
          updatedAt: Date.now()
        }
      })

      res.status(200).json({ msg: `User berhasil di perbaharui.` })

    } catch (err) {
      console.log(err);
    }
  }

  static async delete(req, res) {
    try {
      const id = req.params.id
      const data = await userDB.findOneAndDelete({ _id: ObjectID(id) })
      if (!data.value) throw ({ msg: "User tidak ditemukan" })
      res.status(200).json(data)
    } catch (err) {
      console.log(err);
    }
  }

}

module.exports = UserController