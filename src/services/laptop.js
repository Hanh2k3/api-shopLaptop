const db = require('../models')
const { Op } = require('sequelize')
const { getCategory } = require('./category')

const getCategoryId = async function (id) {
    try {

        const categories = await db.CategoryLaptop.findAll({ 
            where : { laptop_id: id },
            attributes: {
                exclude: ['id', 'laptop_id', 'createdAt', 'updatedAt']
            },
            raw: true,
            nest: true
        })
        
        return categories

        
    } catch (error) {
        
    }
}

// create laptop
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

// get one laptop
export const getLaptop = (id) => new Promise( async (resolve, reject) => {
    try {
    
        const  laptop = await db.Laptop.findOne({
            where: { id: id},
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
            ],
            raw: true,
            nest: true
        })
       
        const category = await db.CategoryLaptop.findAll({
            where: { 
                laptop_id: id
            },   
             attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })
   
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
        console.log(test)
        return resolve({ 
            laptop: test
        })
    } catch (error) {
        reject(error)
        
    }

})


// get list laptop
export const getListLaptops = ({page, limit, name, price, ...query}) => new Promise( async(resolve, reject) => {
    try {  
        const queries = { raw: true, nest: true, }
        const flimit = (limit)  ? +limit : +process.env.LIMIT_BOOK 
        queries.limit = flimit
        const offset = (page) ? ((+page)-1)*flimit: 0 
        queries.offset = offset
        
        if(name != undefined) query.laptop_name = {[Op.substring] : name}
        if(price != undefined) query.price = {[Op.between]: price}

        const laptops = await db.Laptop.findAndCountAll({
            where: query,
            attributes: {
                exclude: ['brand_id']
            },
            include:[
                {
                    model: db.DetailLaptop,
                    foreignKey: 'detail_id', 
                    attributes: {
                        exclude: ['', 'createdAt', 'updatedAt']
                    }
                },
                {
                    model: db.Brand,
                    foreignKey: 'brand_id', 
                    attributes: {
                        exclude: ['id', 'createdAt', 'updatedAt', 'status']
                    }
                }
            ],
            ...queries
        })

                
        for (let i = 0; i < laptops.rows.length; i++) {
            const laptop_id = laptops.rows[i].id
            const categories = await getCategoryId(laptop_id)
            const category = categories.map(category => category.category_id)

            const list_name_cat = []
            for(let j=0; j<category.length; j++) {
                const cat = await getCategory(category[j])
                const cat_name = cat.category.category_name
                list_name_cat.push(cat_name)

            }
            laptops.rows[i].category = list_name_cat
        }
       
        return  resolve({
                laptops : laptops
        })

    } catch (error) {
        reject(error)
    }
})

// update 
export const updateLaptop = (data, laptop_id) => new Promise( async (resolve, reject) => {
    try {
        // update table laptop
       // console.log(data.laptop, laptop_id)
        const laptop = await db.Laptop.update(data.laptop, {where: {id : +laptop_id}})


        // update detail laptop
        const detail = await getLaptop(laptop_id)
        const detail_id = detail.laptop.laptop.detail_id
        const detail_laptop = await db.DetailLaptop.update(data.detail_laptop, {where: {id : detail_id}})
        
        // update category laptop
        // delete 
        await db.CategoryLaptop.destroy({
            where: { laptop_id: laptop_id },
            force: true
        })
        const list_categories = data.category_id.value  
        console.log('cat value', list_categories)
        // create 
        list_categories.forEach(async (item) => {
            
            await db.CategoryLaptop.create({
                category_id: item,
                laptop_id: laptop_id
            })
        })
        const newLaptop = await getLaptop(laptop_id)
        resolve({
            laptop: newLaptop
        })
        
    } catch (error) {
        reject(error)
    }
})

// delete 
export const deleteLaptop = (laptop_id) => new Promise( async (resolve, reject) => {
    try {
        const detail = await getLaptop(laptop_id) 
        const detail_id = detail.laptop.laptop.detail_id
        console.log('detail ',detail_id)
        await db.CategoryLaptop.destroy({
            where: { laptop_id: laptop_id },
            force: true
        })

        await db.Laptop.destroy({
            where: { id: laptop_id },
            force: true,
        })

        await db.DetailLaptop.destroy({
            where: { id: detail_id },
            force: true
        })

        resolve({
            status: 1 
        })

    } catch (error) {
        reject(error)
        
    }
})