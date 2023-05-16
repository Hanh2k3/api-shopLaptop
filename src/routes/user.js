const express = require('express')
const router = require("express-promise-router")()
const user = require('../controllers/user')
const checkAuthorization = require("../middlewares/isHasAuthorization")
const passport = require("../middlewares/verify_token")
const isAdmin= require("../middlewares/verify_role")


router.use(checkAuthorization)
router.use(passport.authenticate("jwt", { session: false })) 
router.get('/', user.getUser)

// address 
router.route('/address')
      .get(user.getAllAddress)
      .post(user.insertAddress)

router.route('/address/default')
      .get(user.getAddressDefault)
      

router.route('/address/:id')
      .put(user.updateAddress)



// PRIVATE ROUTE  is admin 
router.use(isAdmin.isAdmin)
router.get('/listUser', user.getAllUsers)



module.exports = router