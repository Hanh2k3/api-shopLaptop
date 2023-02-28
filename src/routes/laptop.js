const router = require("express-promise-router")()
const checkAuthorization = require("../middlewares/isHasAuthorization")
const isAdmin= require("../middlewares/verify_role")
const validateLaptop = require("../helpers/validate_laptop")
const laptopController = require("../controllers/laptop")
const passport = require("../middlewares/verify_token")


router.route('/').get(laptopController.getListLaptops)
router.route('/:id').get(laptopController.getOne)


// PRIVATE ROUTE
router.use(checkAuthorization)
router.use(passport.authenticate("jwt", { session: false }))      
router.use(isAdmin.isAdmin)
router.route('/')
      .post(validateLaptop, laptopController.create)

router.route('/:id')
      .put(laptopController.updateLaptop)
      .delete(laptopController.deleteLaptop)



module.exports = router