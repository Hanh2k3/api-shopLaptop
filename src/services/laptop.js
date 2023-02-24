const db = require('../models')


export const createLaptop = (data) => new Promise(async(resolve, reject) => {
    try {
        const laptop = await db.Laptop(data)

    } catch (error) {
        reject(error)
    }

})


export const crateDetailLaptop = (data) => new Promise( async (resolve, reject) => {
    try {
        const detail = await db.DetailLaptop.create(data)
        const { id } = detail
        resolve({
            detail_id: id
        })
    } catch (error) {
        reject(error)
    }
})