const express = require('express')
const ImportController = require('../controllers/ImportController')
const siswaRoutes = express.Router()

siswaRoutes.post("/import", ImportController.importSiswa)

module.exports = siswaRoutes