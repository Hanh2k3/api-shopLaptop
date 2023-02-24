const categoryService = require('../services/category')
const db = require('../models')
const { internalServerError } = require('../middlewares/handle_errors')


const createCategory = async (req, res) => {
    try {
        console.log(req.body)
        const result = await categoryService.crateCategory(req.body)
      
        res.status(200).json(result)
    } catch (error) {
        return internalServerError(res, error)
    }
}

module.exports = {
   createCategory 
}