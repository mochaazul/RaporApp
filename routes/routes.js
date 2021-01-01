const express = require('express');
const importRoutes = require('./importRoutes');
const pengumumanRoutes = require('./pengumumanRoutes');
const tahunPelajaranRoutes = require('./tahunPelajaranRoutes');
const walikelasRoutes = require('./walikelasRoutes');
const userRoutes = require('./userRoutes')
const {authentication,isAdmin} = require('../middlewares/authMiddleware')
const Routes = express.Router()

Routes.use(authentication)
Routes.use('/import',importRoutes)
Routes.use('/tapel',tahunPelajaranRoutes)
Routes.use('/walikelas',walikelasRoutes)
Routes.use('/pengumuman', pengumumanRoutes)
Routes.use('/users', userRoutes)

module.exports = Routes