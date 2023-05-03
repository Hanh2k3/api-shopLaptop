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

const getAllAddress = async (req, res, next) => {
    try {
        const user_id = req.user.user.id

        const { data } = await inforShippingService.getAllAddress(user_id)

        return res.status(200).json({
            status: data.length != 0 ? 1 : 0,
            message: data.length != 0 ?'Get all address' : "no address default ",
            data: data 
        })
    } catch (error) {
        handleError.internalServerError(res, error)
        
    }
}

const updateAddress = async (req, res, next) => {
    try {

       
        const user_id = req.user.user.id
        const inforShipping_id = req.params.id 
        // update all UserInforShipping status == 0 
        await inforShippingService.updateStatus(user_id)
        // update default for all 
        const { status } =   await inforShippingService.updateAddress(user_id, inforShipping_id)
        console.log("update address")
        return res.status(200).json({
            status: status == 1 ? 1 : 0 ,
            message: status == 1 ? "Ok update" : "false to update address", 
            data: null 
        })
       
    } catch (error) {
        handleError.internalServerError(res, error)
        
    }
}

module.exports = {
    getAllUsers,
    getUser,
    getAllAddress,
    updateAddress
}