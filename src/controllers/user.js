const useService = require('../services/user')
const handleError = require('../middlewares/handle_errors')
const orderService = require('../services/order')
const inforShippingService = require('../services/inforShiping')

const getAllUsers = async (req, res, next) => {
    try {
        const litUser = await  useService.getAllUser()
        return res.status(200).json(litUser.user)
    
    } catch (error) {
        handleError.internalServerError(res, error)
        
    }
}

const getUser = async (req, res, next) => {
    try {
        const user_id = req.user.user.id

        const { user } = await useService.getOne(user_id)
        const listOrder = await orderService.getOrder(user_id)
        listOrder.length != 0  ? user.count_order = listOrder.length: user.count_order = 0 
        const inforShipping = await inforShippingService.getDefaultShipping(user_id)
        inforShipping.length != 0  ? user.shipping = inforShipping[0].address : user.shipping = null   
        return res.status(200).json(user)
    } catch (error) {
        handleError.internalServerError(res, error)
        
    }
}

module.exports = {
    getAllUsers,
    getUser
}