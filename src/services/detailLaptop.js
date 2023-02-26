const db = require('../models')



export const crateDetailLaptop = (data) => new Promise( async (resolve, reject) => {
    try {
      
        const detail = await db.DetailLaptop.create(data)  
        const  id  = detail.dataValues.id
        resolve({
            detail_id: id
        })
    } catch (error) {
        console.log(error)
        reject(error)
    }
})