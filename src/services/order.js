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

export const getOrder = (user_id) => new Promise( async(resolve, reject) => {
    try {
        const list_order = db.Order.findAll({
            where: { user_id: user_id},
            attributes: { 
                exclude: ['payment_id', 'shipping_id', 'user_id']
            },
            include:[
                {
                    model: db.Payment,
                    foreignKey: 'payment_id', 
                    attributes: {
                        exclude: ['id', 'createdAt', 'updatedAt', 'status']
                    }
                },
                {
                    model: db.Shipping,
                    foreignKey: 'shipping_id', 
                    attributes: {
                        exclude: ['id', 'createdAt', 'updatedAt']
                    }
                },
            ],
            nest: true,
            raw: true
        })
        resolve(list_order)
    } catch (error) {
        reject(error)
    }
})