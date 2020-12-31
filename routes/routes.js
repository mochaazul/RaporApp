const express = require('express');
const importRoutes = require('./importRoutes');
const tahunPelajaranRoutes = require('./tahunPelajaranRoutes');
const Routes = express.Router()



Routes.use('/import',importRoutes)
Routes.use('/tapel',tahunPelajaranRoutes)

module.exports = Routes