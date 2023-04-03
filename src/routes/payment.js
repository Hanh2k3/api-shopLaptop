
const passport = require("../middlewares/verify_token")
const isAdmin= require("../middlewares/verify_role")
const router = require("express-promise-router")()
const checkAuthorization = require("../middlewares/isHasAuthorization")
const paymentController = require("../controllers/payment")



// PRIVATE ROUTE 
router.use(checkAuthorization)
router.use(passport.authenticate("jwt", { session: false }))    
router.use(isAdmin.isAdmin)


router.route("/")
      .post(paymentController.insertPayment)

module.exports = router

