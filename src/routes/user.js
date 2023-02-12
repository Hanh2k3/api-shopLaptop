const route = require('express').Router()
const user = require('../controllers/user')

route.get('/', user.getUser)

module.exports = route