const joi = require('joi')
const db = require('../models')
const handleError = require('../middlewares/handle_errors')
const cloudinary =  require('cloudinary').v2

const validateLaptop = async (req, res, next) => {

    // when test with postman
    req.body.laptop = JSON.parse(req.body.laptop)
    req.body.detail_laptop = JSON.parse(req.body.detail_laptop)
    req.body.category = JSON.parse(req.body.category)

    const { error } = schemaLaptop.validate(req.body.laptop)
    const detail_laptop_err = schemaDetailLaptop.validate(req.body.detail_laptop)
    const error_detailLaptop = detail_laptop_err.error

    const category = schemaCategory.validate(req.body.category)
    const error_category = category.error
    
    const images = req.files
   
    if(error || error_detailLaptop || error_category) {

        if(images.length!=0) {
            // delete from cloudinary     
            console.log('test')
            images.forEach(image => {     
                cloudinary.uploader.destroy(image.filename)
            })
        }        
        res.status(400).json({ 
            error: error === undefined ? 1: error.message,
            error_detailLaptop: error_detailLaptop === undefined ? 1 : error_detailLaptop.message,
            error_category: error_category === undefined ? 1: error_category.message,
            status : 0 
        })
    } else next()
}

const schemaLaptop = joi.object({
    laptop_name: joi.string().required(),
    status: joi.number().integer().required(),
    qty: joi.number().integer().required(),
    price: joi.number().required(),
    brand_id: joi.number().integer().required(),
})

const schemaDetailLaptop = joi.object({
    cpu: joi.string().required(),
    ram: joi.string().required(),
    rom: joi.string().required(),
    card_vga: joi.string().required(),
    webcam: joi.string().required(),
    connect: joi.string().required(),
    weight: joi.number().required(),
    pin: joi.string().required(),
    os: joi.string().required(),
    desc: joi.required()
})


const schemaCategory = joi.array().items(joi.number().required()).min(1).required()



module.exports = validateLaptop