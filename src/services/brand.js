const db = require('../models')

// create
export const createBrand = (data) => new Promise( async (resolve, reject) => {
    try {
        const brand = await db.Brand.create(data)
        resolve({
            message: 'Brand created successfully',
            brand: brand,
            status: 1
        })
    } catch (error) {
        reject(error)
    }
})

// read list brand 
export const getAllBrands = () => new Promise( async(resolve, reject) => {
    try {
        const brands = await db.Brand.findAll({
            raw: true,
            nest: true
        }) 

        resolve({
            brands: brands
        })

    } catch (error) {
        reject(error)
    }
})

export const getBrand = (id) => new Promise (async (resolve, reject) => {
    try {
        const brand = await db.Brand.findOne({
            where: { id: id },
            raw: true,
            nest: true
        })
        resolve({ 
            brand: brand
        })
    } catch (error) {
        reject(error)
    }
})

// update brand
export const update = (id, data) => new Promise( async (resolve, reject) => {
    try {
        const brand = await db.Brand.update( data,{ where: { id: +id}})
        resolve({
            brand: brand
        })
    } catch (error) {
        reject(error)
    }
})


// delete brand 
export const remove = (id) => new Promise( async (resolve, reject) => {
    try {
        const result = await db.Brand.destroy({ 
            where : { id: id},
            force: true
        })
        resolve({
            status: 1
        })
    } catch (error) {
        reject(error)
    }
})