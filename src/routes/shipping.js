const express = require('express')
const router = require("express-promise-router")()
const shipping = require('../controllers/shipping')
const checkAuthorization = require("../middlewares/isHasAuthorization")
const passport = require("../middlewares/verify_token")
const isAdmin= require("../middlewares/verify_role")

// PRIVATE ROUTER 

router.use(checkAuthorization)
router.use(passport.authenticate("jwt", { session: false })) 
router.route('/')
      .get(shipping.listShipping)
      .post(shipping.insertShipping)

router.route('default')
      .get(shipping.getShippingDefault)


module.exports = router