
// module.exports = db = require('knex')({
//   client: 'mysql2',
//   connection: {
//     host: '127.0.0.1',
//     user: 'dev',
//     password: 'dev',
//     database: 'raporapp_dev'
//   }
// })

const { MongoClient } = require('mongodb')

const connectionString = process.env.DB_STRING || "mongodb://localhost:27017"
const dbName = process.env.DB_NAME || "raporApp"
const client = new MongoClient(connectionString, { useUnifiedTopology: true })

client.connect()
module.exports = db = client.db(dbName)

