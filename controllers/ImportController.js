
const XLSX = require('xlsx');
const db = require('../config/db');
const getType = require('../helpers/getType');

class ImportController {
  static importSiswa(req, res) {
    let sheet = XLSX.readFile(req.file.path)
    let SheetNames = sheet.SheetNames[0]
    let dataSiswa = XLSX.utils.sheet_to_json(sheet.Sheets[SheetNames], { defval: null })
    let query = `CREATE TABLE siswa ( id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,`

    if (dataSiswa.length > 0) {
      db.schema.dropTableIfExists('siswa')
      dataSiswa.forEach((siswa, index) => {

        if (index === 0) {          
          // Ambil key dari data siswa pada index ke 0
          // Hapus object dengan key __EMPTY <- key ini di generate sama modul XLSX
          let keys = Object.keys(siswa).filter(item => item !==  '__EMPTY')
          
          // Loop dari array berisi key lalu buat append command ke variabel query
          keys.forEach(item=>{
            // item.replace -> menghilangkan whitespace
            // getType() return tipe data dari row pertama
            query += `${item.replace(/\s+/, "")} ${getType(siswa[item])}, `
          })

          query += " created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)"
        }
      })
    }
    res.status(200).json(dataSiswa)

  }
}

module.exports = ImportController