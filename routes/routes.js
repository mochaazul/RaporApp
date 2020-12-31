const express = require('express');
const importRoutes = require('./importRoutes');
const tahunPelajaranRoutes = require('./tahunPelajaranRoutes');
const WalikelasRoutes = require('./WalikelasRoutes');
const Routes = express.Router()

Routes.use('/import',importRoutes)
Routes.use('/tapel',tahunPelajaranRoutes)
Routes.use('/walikelas',WalikelasRoutes)
module.exports = Routes