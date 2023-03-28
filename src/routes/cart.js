
const passport = require("../middlewares/verify_token")
const router = require("express-promise-router")()
const checkAuthorization = require("../middlewares/isHasAuthorization")
const cartController = require("../controllers/cart")



// PRIVATE ROUTE 
router.use(checkAuthorization)
router.use(passport.authenticate("jwt", { session: false }))    

router.route("/")
      .post(cartController.insertCart)
      .get(cartController.getAll)
      .put(cartController.updateItem)

router.route("/:laptop_id")
      .delete(cartController.removeItem)
      
 
module.exports = router

