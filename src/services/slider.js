const db = require('../models')

// insert slider 
export const insertSlider = (data) => new Promise( async(resolve, reject) => {
    try {
        
        const slider = await db.Slider.bulkCreate(data)
        resolve({
            status: 1
        })
    } catch (error) {
        reject(error)
    }
})

export const getAllSlider = () => new Promise( async(resolve, reject) => {
    try {
        
        const slider = await db.Slider.findAll({
            raw: true,
            nest : true 
        })
        resolve(slider)
    } catch (error) {
        reject(error)
    }
})

