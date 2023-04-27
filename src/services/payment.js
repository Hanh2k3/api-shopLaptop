const db = require('../models')

export const insertPayment = (data) => new Promise(async(resolve, reject) => {
    try {
        await db.Payment.create(data) 
        resolve({
            status:  1
        })
    } catch (error) {
        reject(error)
    }
})

