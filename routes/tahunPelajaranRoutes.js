const express = require('express')
const TahunPelajaranController = require('../controllers/TahunPelajaranController')
const tahunPelajaranRoutes = express.Router()

tahunPelajaranRoutes.get('/',TahunPelajaranController.index)
tahunPelajaranRoutes.get('/:id',TahunPelajaranController.findById)
tahunPelajaranRoutes.post('/',TahunPelajaranController.insert)
tahunPelajaranRoutes.put('/:id',TahunPelajaranController.update)
tahunPelajaranRoutes.delete('/:id',TahunPelajaranController.delete)


module.exports = tahunPelajaranRoutes