const express = require('express')
const SiswaController = require('../controllers/SiswaController')
const siswaRoutes = express.Router()

siswaRoutes.get("/",SiswaController.index)
module.exports = siswaRoutes