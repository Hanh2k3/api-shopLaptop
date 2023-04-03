const db = require('../models')


export const insertShipping = (data) => new Promise( async(resolve, reject) => {
    try {
        const shipping = await db.Shipping.create(data)
  
        resolve({
            shipping_id: shipping.dataValues.id,
            fees_ship: shipping.dataValues.fees_ship
        })
    } catch (error) {
        reject(error)
    }
})