import express from 'express'
const route = express.Router()
const user = require('../controllers/user')

route.get('/', user.getUser)

module.exports = route