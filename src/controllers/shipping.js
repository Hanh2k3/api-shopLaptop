
const handleError = require('../middlewares/handle_errors')
const shippingService = require('../services/shipping')

const listShipping = async (req, res) => {
    try {
        const list = await shippingService.getListShipping(+ req.user.id)
        return res.status(200).json(list)
    } catch (error) {
        handleError.internalServerError(res, error)
    }
}

const insertShipping = async (req, res) => {
    try {
        const user_id = + req.user.user.id
        const { address, phone, ward_id, district_id } = req.body
        const data = {address, phone, ward_id, district_id}
        const { inforShipping_id }  = await shippingService.insertShippingDefault(data)
        const data1 = {user_id, inforShipping_id, status : 1}
        console.log(data1)
        await shippingService.insertUserInforShipping(data1)
        return res.status(200).json({
            status : 1,
            message : 'Success',
            data: null 
        })
    } catch (error) {
        handleError.internalServerError(res, error)
    }
}

const getShippingDefault = async (req, res) => {
    try {
        const user_id = + req.user.user.id

        try {
            const litUser = await  useService.getAllUser()
            return res.status(200).json(litUser.user)
        
        } catch (error) {
            handleError.internalServerError(res, error)
            
        }

     
    
        return res.status(200).json({
            status : 1,
            message : 'Success',
            data: null 
        })
    } catch (error) {
        handleError.internalServerError(res, error)
    }
}

module.exports = {
    listShipping,
    insertShipping,
    getShippingDefault
}
