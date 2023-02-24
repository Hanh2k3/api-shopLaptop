const brandService = require('../services/brand')
const handleError = require('../middlewares/handle_errors')



const create = async (req, res) => {
    try {
        const result = await brandService.createBrand(req.body)
        res.status(200).json(result)
    } catch (error) {
        handleError.internalServerError(res, error)
    }
}

module.exports = {
    create
}