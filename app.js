require('dotenv')
const express = require('express')
const app = express()
const cors = require('cors');
const Routes = require('./routes/routes');
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use(Routes)


app.listen(PORT,()=> console.log(`App is running on http://localhost:${PORT}`))