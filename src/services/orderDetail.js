const db = require('../models')

export const  insertOrderDetail = (data) => new Promise( async(resolve, reject) => {
    try {
        const orderDetail = await db.OrderDetail.bulkCreate(data)
        resolve({
            status: 1  
        }) 
    } catch (error) {
        reject(error)
    }

})