const db = require('../models')


export const createLaptop = (data) => new Promise(async(resolve, reject) => {
    try {
        const laptop = await db.Laptop.create(data)
        const id = laptop.dataValues.id
        resolve({
            laptop_id: id,
        })  

    } catch (error) {
        reject(error)
    }

})

export const getLaptop = (id) => new Promise( async (resolve, reject) => {
    try {
    
        const  laptop = await db.Laptop.findOne({
            where: { id: id},
            attributes: {
                exclude: ['detail_id', 'brand_id']
            },
            include:[
                {
                    model: db.DetailLaptop,
                    foreignKey: 'detail_id', 
                    attributes: {
                        exclude: ['id', 'createdAt', 'updatedAt']
                    }
                },
                {
                    model: db.Brand,
                    foreignKey: 'brand_id', 
                    attributes: {
                        exclude: ['id', 'createdAt', 'updatedAt', 'status']
                    }
                }
            ]
        })
       
        const category = await db.CategoryLaptop.findAll({
            where: { 
                laptop_id: id
            },   
             attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })
        console.log(category)

        const list_category =  []
        for(let i=0 ; i < category.length; i++) {
            const category_id = category[i].dataValues.category_id
            const cat = await db.Category.findByPk(category_id)
            const cat_name = cat.dataValues.category_name 
            list_category.push(cat_name)
        }

        const test = {
            laptop
        }
        test.category = list_category
        return resolve({ 
            laptop: test
        })
    } catch (error) {
        reject(error)
        
    }


})

