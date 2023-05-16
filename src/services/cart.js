const db = require('../models')
const laptopService = require('../services/laptop')
const con = require('../config/db')

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
            message: "Add product to cart success",
            data: null 
        })
    } catch (error) {
        reject(error)
    }
})

export const getAll = (user_id) => new Promise( async(resolve, reject) => {
    try {
        
        const product = await  db.Cart.findAll({
            where: { user_id },
            order : [['laptop_id' , 'ASC']],
            raw: true,
            nest: true
        })
        
        if(product.length == 0) return resolve(product)    
        const laptop_id = product.map(item => item.laptop_id)
        const laptops = await  laptopService.getListLaptops({id:laptop_id})
        const newArr = product.map(item => item.qty)
        const arrSort = newArr
        for(let i=0; i<product.length; i++) {
            laptops.laptops.rows[i].qty = arrSort[i]
        }  
        const rows = laptops.laptops.rows.sort((a, b)  => {
            console.log("a" , a.createdAt); 
            const datea = new Date(a.createdAt); 
            const dateb = new Date(b.createdAt);
            return datea >=dateb ? true : false 
        })
        laptops.laptops.rows = rows
        return resolve(laptops)
    } catch (error) {
        reject(error)
    }
})

export const updateItem = (user_id, laptop_id, qty) => new Promise( async(resolve, reject) => {
    try {       
       const sql = `update carts set qty = ${qty} where user_id = ${user_id} and laptop_id = ${laptop_id}`
       con.query(sql, (err, result) => {
            if (err) return reject(err)
       })
       resolve({
            oke: "oke"
       })
    } catch (error) {
        reject(error)
    }
})

export const removeItem = (user_id, laptop_id) => new Promise( async(resolve, reject) => {
    try {
        const sql = `delete from carts where user_id = ${user_id} and laptop_id = ${laptop_id}`
        con.query(sql, (err, result) => {
            if(err) return reject(err)

        })
        resolve({
            status: 1
        })
    } catch (error) {
        reject(error)
    }
})