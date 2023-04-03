const orderService = require('../services/order')
const shippingService = require('../services/shipping')
const handleError = require('../middlewares/handle_errors')



const insertOrder = async (req, res) => {
    try {
        
        const user_id = req.user.user.id 
        const shippingData = req.body.shipping

        // handle shipping 
        const shipping = await shippingService.insertShipping(shippingData)
        const shipping_id = shipping.shipping_id
        const fees_ship = shipping.fees_ship
        console.log(shipping_id, fees_ship)
        // get Total price of product
        const { laptops, payment } = req.body 
        const total_product =  laptops.reduce((total, item) => {
            return total + item.price*item.qty
        }, 0)
        const total = total_product + fees_ship 
        const orderData = {
            user_id: user_id,
            shipping_id: shipping_id,
            payment_id: payment,
            status: 1,
            total_product: total_product,
            total: total
        }
        const {order_id } = await orderService.insertOrder(orderData)

        // create data for orderDetail 
        const orderDetailData = laptops.map(item => {
            return  {
                laptop_id: item.laptop_id,
                price: item.price,
                qty: item.qty,
                order_id: order_id
            }
        })
        return res.status(200).json({
            status: 1,
            message: "Order successfully"
        })      
    } catch (error) {
        handleError.internalServerError(res, error)  
    }  
}



module.exports = {
    insertOrder
 
}