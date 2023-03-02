const db = require('../models')


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