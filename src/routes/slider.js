
const passport = require("../middlewares/verify_token")
const router = require("express-promise-router")()
const checkAuthorization = require("../middlewares/isHasAuthorization")
const sliderController = require("../controllers/slider")
const isAdmin= require("../middlewares/verify_role")
const  { uploadSlider }   = require("../middlewares/slider")

// PUBLIC ROUTE
router.route("/")
      .get(sliderController.getAllSlider)

// PRIVATE ROUTE 
router.use(checkAuthorization)
router.use(passport.authenticate("jwt", { session: false }))    
router.use(isAdmin.isAdmin)


router.route("/")
      .post(uploadSlider.array('images'),sliderController.insertSlider)
      

module.exports = router
