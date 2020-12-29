const express = require('express')
const multer = require('multer')
const ImportController = require('../controllers/ImportController')
const importRoutes = express.Router()
const upload = multer({dest:'../uploads/'})

importRoutes.post("/siswa", upload.single('siswa_excel'), ImportController.importSiswa)

module.exports = importRoutes