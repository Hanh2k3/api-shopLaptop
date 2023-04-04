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
export const  getOrderDetail = (order_id) => new Promise( async(resolve, reject) => {
    try {
        const orderDetail = await db.OrderDetail.findAll({
            where: { order_id: order_id},
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'laptop_id']
            },
            include: [
                {
                    model: db.Laptop,
                    foreignKey: 'laptop_id',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt','detail_id' , 'qty', 'status', 'brand_id','price' ]
                    }
                }
            ],
            raw: true,
            nest : true
        })
        return resolve(orderDetail)
    } catch (error) {
        reject(error)
    }

})