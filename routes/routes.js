const express = require('express');
const importRoutes = require('./importRoutes');
const pengumumanRoutes = require('./pengumumanRoutes');
const tahunPelajaranRoutes = require('./tahunPelajaranRoutes');
const walikelasRoutes = require('./walikelasRoutes');
const Routes = express.Router()

Routes.use('/import',importRoutes)
Routes.use('/tapel',tahunPelajaranRoutes)
Routes.use('/walikelas',walikelasRoutes)
Routes.use('/pengumuman', pengumumanRoutes)
module.exports = Routes