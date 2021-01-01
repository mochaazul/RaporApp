const { ObjectID } = require("mongodb")
const { decodeToken } = require("../helpers/jwt")
const User = require("../config/db").collection('users')

// TODO CHECK IF ADMIN MIDDLEWARE;

async function authentication(req, res, next) {
  try {
    let access_token = req.headers.access_token
    if (!access_token) throw { msg: "Not Authenticated", status: 401 }

    let decodedToken = { _id, username, nama, role } = decodeToken(access_token)

    let user = await User.findOne({ _id: ObjectID(decodedToken._id) })
    if (!user) throw { msg: "Not authenticated", status: 401 }

    req.loggedInUser = user
    next()
  } catch (err) {
    next(err)
  }

}

async function isAdmin(req, res, next) {
  try {
    let user = req.loggedInUser
    if (user.role !== 'admin') throw { msg: 'Not authorized, only admin can have access', status: 403 }
    next()
  } catch (err) {
    next(err)
  }
}

module.exports = {
  authentication,
  isAdmin
}