const express = require('express');
const WaliKelasController = require('../controllers/WaliKelasController');
const WalikelasRoutes = express.Router()

WalikelasRoutes.get('/',WaliKelasController.index)
WalikelasRoutes.get('/:id', WaliKelasController.findById)
WalikelasRoutes.post('/',WaliKelasController.insert)
WalikelasRoutes.put("/:id",WaliKelasController.update)
WalikelasRoutes.delete('/:id',WaliKelasController.delete)

module.exports = WalikelasRoutes