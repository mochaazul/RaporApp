function errorHandler(err, req, res, next) {
  console.log(err)
  res.status(err.status).json({msg:err.msg})
}

module.exports = errorHandler