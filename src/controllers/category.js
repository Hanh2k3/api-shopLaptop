const categoryService = require('../services/category')
const db = require('../models')
const { internalServerError } = require('../middlewares/handle_errors')


const createCategory = async (req, res) => {
    try {
        console.log(req.body)
    } catch (error) {
        return res.internalServerError(res, error)
    }
}

module.exports = {
   createCategory 
}