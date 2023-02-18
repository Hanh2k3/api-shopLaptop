const express = require('express')
const route = express.Router()
const user = require('../controllers/user')

route.get('/', user.getUser)

module.exports = route