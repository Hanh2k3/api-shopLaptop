const laptopService = require('../services/laptop')
const handleError = require('../middlewares/handle_errors')



const create = async (req, res) => {
    try {
        console.log(req.body)
        //const result = await laptopService.createLaptop(req.body)
        res.status(200).json(req.body)
    } catch (error) {
        handleError.internalServerError(res, error)
    }
}

module.exports = {
    create
}