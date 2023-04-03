const paymentService = require('../services/payment')
const handleError = require('../middlewares/handle_errors')



const insertPayment = async (req, res) => {
   try {
        const { status } = await paymentService.insertPayment(req.body)
        return res.status(200).json(status)
   } catch (error) {
    handleError.internalServerError(res, error)  
   } 
}

module.exports = {
    insertPayment
}