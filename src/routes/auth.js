const authController = require("../controllers/auth")
const express = require("express");
const validateRegister = require("../helpers/validate_register")
const validateLogin = require("../helpers/validate_login")
const passport = require("../middlewares/veryfi_token")
const router = require("express-promise-router")()

router.route("/register").post(validateRegister, authController.register)
router.route("/login").post(validateLogin, authController.login)


router
  .route("/google")
  .post(
    passport.authenticate("google-plus-token", { session: false }),
    authController.loginGoogle
  )
router
  .route("/testJWT")
  .get(
    passport.authenticate("jwt", { session: false }),
    authController.testJwt
  )
module.exports = router
