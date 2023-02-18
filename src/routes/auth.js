const authController = require('../controllers/auth')
const express = require('express')
const validate = require('../helpers/user_validation')
const passport = require('../middlewares/veryfi_token')
const router = require('express-promise-router')()



router.route('/register').post(validate, authController.register)
router.route('/google').post(passport.authenticate('google-plus-token', { session: false}), authController.loginGoogle )
router.route('/testJWT').get(passport.authenticate('jwt', { session: false }), authController.testJwt)
module.exports =  router 