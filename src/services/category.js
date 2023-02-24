const db = require('../models')

export const crateCategory = (data) => new Promise( async (resolve, reject) => {
    try {
       const category = await db.Category.create(data)
       resolve({
        message: "Create category successfully",
        category: category
       })
    } catch (error) {
        console.log(error)
        reject(error)
    }
})
