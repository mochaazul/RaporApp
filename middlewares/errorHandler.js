function errorHandler(err, req, res, next) {
  console.log(err)
  if(err.status && err.msg){
    res.status(err.status).json({msg:err.msg})
  }else{
    res.status(500).json(err)
  }
}

module.exports = errorHandler