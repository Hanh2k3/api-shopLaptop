const joi = require('joi')
const db = require('../models')
const handleError = require('../middlewares/handle_errors')


const validateLaptop = async (req, res, next) => {
    const { error } = schemaLaptop.validate(req.body.laptop)
    const detail_laptop = schemaDetailLaptop.validate(req.body.detail_laptop)
    const error_detailLaptop = detail_laptop.error

    const test = JSON.parse(req.body.laptop)
    
    console.log(test.laptop_name)
    console.log(typeof(test))
    console.log(req.files)
    const category = schemaCategory.validate(req.body.category_id)
    const error_category = category.error
   
    const image = schemaImage.validate(req.body.images)
    const error_image = image.error


    if(error || error_detailLaptop || error_category || error_image){
        res.status(400).json({ 
            error: error === undefined ? "no error laptop": error.message,
            error_detailLaptop: error_detailLaptop === undefined ? "no error detail laptop" : error_detailLaptop.message,
            error_category: error_category === undefined ? "no error_category laptop": error_category.message,
            error_image: error_image === undefined ? "no error_image laptop": error_image.message,
            status : 0 
        })
    } else {
        const checkExit = await db.Laptop.findOne({ where : { laptop_name: req.body.laptop.laptop_name } })
        if(!checkExit) next()
        else return res.status(401).json({
            error: `${req.body.laptop.laptop_name} is exit`, 
            status: 0
        })
    } 
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


const schemaCategory = joi.object({
    value: joi.array().items(joi.number().required()).min(1).required()
})

const schemaImage = joi.array().items(joi.number().required()).min(1).required()


module.exports = validateLaptop