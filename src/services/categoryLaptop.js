const db = require('../models')



export const crateCategoryLaptop = (data) => new Promise( async (resolve, reject) => {
    try {
       
        const detail = await db.CategoryLaptop.create(data)
        const  id  = detail.dataValues.id
      
        resolve({
            detail_id: id
        })
    } catch (error) {
        console.log(error)
        reject(error)
    }
})