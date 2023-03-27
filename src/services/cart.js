const db = require('../models')
const laptopService = require('../services/laptop')

export const checkIsExit = (user_id, laptop_id) => new Promise( async(resolve,reject) => {
    try {  
        const cart  =  await db.Cart.findOne({
            where : {
                user_id : user_id,
                laptop_id : laptop_id
            }
        })
        resolve({
            isExit: cart?true:false,
        })
    } catch (error) {
        reject(error)
    }
})

export const add = (user_id, laptop_id, qty) => new Promise( async(resolve,reject) => {
    try {
        // add laptop into cart 
        const cart  =  await db.Cart.create({user_id, laptop_id, qty})
        resolve({
            status: 1,
            message: "Add product to cart success"
        })
    } catch (error) {
        reject(error)
    }
})

export const getAll = (user_id) => new Promise( async(resolve, reject) => {
    try {
        
        const product = await  db.Cart.findAll({
            where: { user_id },
            raw: true,
            nest: true
        })
        if(product.length == 0) return resolve(product)    
        const laptop_id = product.map(item => item.laptop_id)
        const laptops = await  laptopService.getListLaptops({id:laptop_id})
        for(let i=0; i<product.length; i++) {
            laptops.laptops.rows[i].qty = product[i].qty
        }
        return resolve(laptops)
    } catch (error) {
        reject(error)
    }
})