
const passport = require("../middlewares/verify_token")
const router = require("express-promise-router")()
const checkAuthorization = require("../middlewares/isHasAuthorization")
const orderController = require("../controllers/order")

// PRIVATE ROUTE 
router.use(checkAuthorization)
router.use(passport.authenticate("jwt", { session: false }))    

router.route("/")
      .post(orderController.insertOrder)
      .get(orderController.getOrder)

module.exports = router

