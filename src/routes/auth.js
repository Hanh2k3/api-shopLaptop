const controllers = require('../controllers')
const express = require('express')
const validate = require('../helpers/user_validation')
const passport = require('../middlewares/veryfi_token')
const route = express.Router()


route.post('/register',validate, controllers.register) 
route.get('/testJWT',passport.authenticate('jwt', { session: false }), controllers.testJwt) 
module.exports =  route 