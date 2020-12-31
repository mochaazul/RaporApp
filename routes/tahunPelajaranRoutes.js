const express = require('express')
const TahunPelajaranController = require('../controllers/TahunPelajaranController')
const tahunPelajaranRoutes = express.Router()

tahunPelajaranRoutes.get('/',TahunPelajaranController.index)

module.exports = tahunPelajaranRoutes