const db = require('../models')
const con = require('../config/db')



export const createImage = (data) => new Promise(async (resolve, reject) => {
    try {
        const image = await db.Image.create(data)
        resolve({
            image: image
        })
    } catch (error) {
        reject(error)
    }

})

export const createMulImage = (data) => new Promise( async (resolve, reject) => {
    try {
        const images = await db.Image.bulkCreate(data)
        resolve({
            status: 1
        })
    } catch (error) {
        reject(error)
    }
})

export const getListImages = (laptop_id) => new Promise( async(resolve, reject) => {

    try {
        const listImages = await db.Image.findAll({
            where: { laptop_id: laptop_id },
            attributes: {
                exclude: ['id', 'createdAt', 'updatedAt']
            },
            raw: true,
            nest: true
        })    

        resolve({
            images: listImages
        })

    } catch (error) {
        reject(error)
    }
})

export const getListImagesSync =  (laptop_id) =>  {
    try {
        const sql = "SELECT id, path FROM images WHERE laptop_id = " + laptop_id
        let resutl = []
        const data =   con.query(sql, (err, rows) => {
            return rows
        })
        return data 
        
    } catch (error) {
        
    }

   
}

export const remove = (laptop_id) => new Promise( async (resolve, reject) => {
    try {
        const result = await db.Image.destroy({
            where: { laptop_id: laptop_id },
            force: true
        })
        resolve({
            status: 1
        })
    } catch (error) {
        reject(error)
    }
})