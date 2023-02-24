const router = require("express-promise-router")()
const checkAuthorization = require("../middlewares/isHasAuthorization")
const isAdmin= require("../middlewares/verify_role")
const validateBrand = require("../helpers/validate_brand")
const brandController = require("../controllers/brand")
const passport = require("../middlewares/verify_token")




// PRIVATE ROUTE
router.use(checkAuthorization)
router.use(passport.authenticate("jwt", { session: false }))      
router.use(isAdmin.isAdmin)

router.route('/')
      .post(validateBrand, brandController.create)



module.exports = router