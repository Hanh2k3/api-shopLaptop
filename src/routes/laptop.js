const router = require("express-promise-router")()
const checkAuthorization = require("../middlewares/isHasAuthorization")
const isAdmin= require("../middlewares/verify_role")
const validateLaptop = require("../helpers/validate_laptop")
const laptopController = require("../controllers/laptop")
const passport = require("../middlewares/verify_token")
const uploader = require("../middlewares/uploader")
const { checkExits  } = require("../helpers/validate_delete")
const validateUpDate = require("../helpers/validate_update_laptop")


router.route('/').get(laptopController.getListLaptops)
router.route('/:id').get(laptopController.getOne)


// PRIVATE ROUTE
router.use(checkAuthorization)
router.use(passport.authenticate("jwt", { session: false }))      
router.use(isAdmin.isAdmin)
router.route('/')
      //.post(validateLaptop, laptopController.create)
      .post(uploader.array('images'),validateLaptop,laptopController.create) // ,


router.route('/:id')
      .put(checkExits,uploader.array('images'),validateUpDate,laptopController.updateLaptop)
      .delete(checkExits, laptopController.deleteLaptop)


module.exports = router