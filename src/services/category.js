const db = require('../models')

export const crateCategory = (data) => new Promise( async (resolve, reject) => {
    try {
       const category = await db.Category.create(data)
       resolve({
        message: "Create category successfully",
        category: category,
        status: 1
       })
    } catch (error) {
        console.log(error)
        reject(error)
    }
})

export const getCategory = (id) => new Promise(async (resolve, reject) => {
    try {
        const category = await db.Category.findOne({ 
            where: { id: id},
            raw: true,
            nest: true
        })
        resolve({
            category: category
        })
    } catch (error) {
        reject(error)
    }
})
