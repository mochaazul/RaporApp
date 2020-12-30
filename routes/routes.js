const express = require('express');
const importRoutes = require('./importRoutes');
const Routes = express.Router()

Routes.use('/import',importRoutes)

module.exports = Routes