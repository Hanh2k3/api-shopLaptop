const db = require('../models')


export const insertOrder = (data) => new Promise( async(resolve, reject) => {
    try {
        const order = await db.Order.create(data)
        resolve({
            order_id: order.dataValues.id
        })
    } catch (error) {
        reject(error)
    }
})