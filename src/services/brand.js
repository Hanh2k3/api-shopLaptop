const db = require('../models')


export const createBrand = (data) => new Promise( async (resolve, reject) => {
    try {
        const brand = await db.Brand.create(data)
        resolve({
            message: 'Brand created successfully',
            brand: brand,
            status: 1
        })
    } catch (error) {
        reject(error)
    }
})