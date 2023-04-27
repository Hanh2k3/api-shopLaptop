const db = require('../models')
const con = require('../config/db')


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

export const insertShippingDefault = (data) => new Promise( async(resolve, reject) => {
    try {
        const newShippingDefault = await db.InforShipping.create(data)
        return resolve({
            inforShipping_id : newShippingDefault.id
        })
        
    } catch (error) {
        reject(error)
    }
})

export const insertUserInforShipping = (data) => new Promise( async(resolve, reject) => {
    try {
        await db.UserInforShipping.update({status: 0}, {where: {user_id: data.user_id }})
        await db.UserInforShipping.create(data)
        
       return resolve("insert sucees")
    } catch (error) {
        reject(error)
    }
})

export const getListShipping = (user_id) => new Promise( async (resolve, reject) => {
    try {
        const list = await db.UserInorShipping.finAll({
            include:[
                {
                    model: db.User,
                    foreignKey: 'user_id', 
                    attributes: {
                        exclude: ['id', 'createdAt', 'updatedAt']
                    }
                },
                {
                    model: db.InforShipping,
                    foreignKey: 'inforShipping_id', 
                    attributes: {
                        exclude: ['id', 'createdAt', 'updatedAt', 'status']
                    }
                }
            ],
            
        })
        resolve(list)
        
    } catch (error) {
        reject(error)
    }
})