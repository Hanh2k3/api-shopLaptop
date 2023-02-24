const authController = require("../controllers/auth")
const express = require("express");
const validateRegister = require("../helpers/validate_register")
const validateLogin = require("../helpers/validate_login")
const passport = require("../middlewares/verify_token")
const router = require("express-promise-router")()
const checkAuthorization = require("../middlewares/isHasAuthorization")
const isAdmin= require("../middlewares/verify_role")


// ROUTE PUBLIC 
router.route("/login").post(validateLogin, authController.login)
router.route("/register").post(validateRegister, authController.register)

router.route("/google")
      .post(passport.authenticate("google-plus-token", { session: false }),authController.loginGoogle)

// router.route("/facebook")
//       .post(passport.authenticate("facebook-token", { session: false}), authController.loginFacebook)


// ROUTE PRIVATE
router.use(checkAuthorization)
router.use(passport.authenticate("jwt", { session: false }))      
router.use(isAdmin.isAdmin)
router.route("/testJWT")
      .get(authController.testJwt)
router.route("/checkRole")
      .get((req, res) => {
            res.send("true verify role")
      })

module.exports = router
