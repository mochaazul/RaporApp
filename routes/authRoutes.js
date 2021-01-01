const express = require('express')
const AuthController = require('../controllers/AuthController')
const authRoutes = express.Router()

authRoutes.post('/token',AuthController.login)
authRoutes.post('/register',AuthController.register)

module.exports = authRoutes