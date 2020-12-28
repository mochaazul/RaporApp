const express = require('express');
const Routes = express.Router()

Routes.get("/",(req,res)=>res.send('ini dari ruter'))

module.exports = Routes