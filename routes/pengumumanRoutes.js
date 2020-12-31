const express = require('express')
const PengumumanController = require('../controllers/PengumumanController')
const pengumumanRoutes = express.Router()

pengumumanRoutes.get('/',PengumumanController.index)
pengumumanRoutes.get('/:id',PengumumanController.findById)
pengumumanRoutes.post('/',PengumumanController.insert)
pengumumanRoutes.put('/:id',PengumumanController.update)
pengumumanRoutes.delete('/:id',PengumumanController.delete)
module.exports = pengumumanRoutes