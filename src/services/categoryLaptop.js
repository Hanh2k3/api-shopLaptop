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

export const createMulCategoryLaptop = (data) => new Promise( async (resolve, reject) => {
    try {
        const list = await db.CategoryLaptop.bulkCreate(data)
        resolve({
            status: 1
        })
    } catch (error) {
        reject(error)
    }
})

export const getListCategoryId = (laptop_id) => new Promise(async (resolve, reject) => {
    try {
        const categories = await db.CategoryLaptop.findAll({
            where: {laptop_id: laptop_id},
            attributes: {
                exclude: ['id', 'laptop_id', 'createdAt', 'updatedAt'] 
            },
            raw: true,
            nest: true
        })

        resolve({
            categories_id: categories
        })


    } catch (error) {
        reject(error)
    }
})

export const remove = (laptop_id) => new Promise( async (resolve, reject) => {
    try {
        const result = await db.CategoryLaptop.destroy({
            where: { laptop_id: laptop_id },
            force: true
        })
    } catch (error) {
        reject(error)
        
    }
})