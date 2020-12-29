const multer = require('multer');
const diskStorage = require('../config/multerDiskStorage');
const path = require('path');
const upload = multer({ //multer settings
  storage: diskStorage,
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if (ext !== '.xls' && ext !== '.xlsx') {
      return callback(new Error('Only Excel Filetype are allowed'))
    }
    callback(null, true)
  },
})

module.exports = upload