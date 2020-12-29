
module.exports = db = require('knex')({
  client: 'mysql2',
  connection: {
    host: '127.0.0.1',
    user: 'dev',
    password: 'dev',
    database: 'raporapp_dev'
  }
})
