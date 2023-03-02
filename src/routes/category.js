const router = require("express-promise-router")()
const checkAuthorization = require("../middlewares/isHasAuthorization")
const isAdmin= require("../middlewares/verify_role")
const validateCategory = require("../helpers/validate_category")
const categoryController = require("../controllers/category")
const passport = require("../middlewares/verify_token")

// PUBLIC ROUTE
router.route("/").get(categoryController.getAllCategories)
router.route("/:id").get(categoryController.getCategory)


// PRIVATE ROUTE
router.use(checkAuthorization)
router.use(passport.authenticate("jwt", { session: false }))      
router.use(isAdmin.isAdmin)

router.route('/')
      .post(validateCategory, categoryController.createCategory)
      
router.route('/:id')
      .put(validateCategory, categoryController.update)
      .delete(categoryController.remove)


module.exports = router