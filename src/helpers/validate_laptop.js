const joi = require('joi')
const db = require('../models')
const handleError = require('../middlewares/handle_errors')


const isLaptopExit = async (laptop_name, res) =>  {
    try {
        const laptop = await db.laptop.findOne({ where : { laptop_name } })
        if(laptop === null ) {
            return false
        } else return true
    } catch (error) {
        handleError.badRequest(error, res)
    }
}
const validateLaptop = async (req, res, next) => {
    const { error } = schema.validate(req.body)
    if(error){
        res.status(400).json({ 
            error: error.message,
            status : 0 
        })
    } else {
        const checkExit = await isLaptopExit(req.body.laptop_name, res)
        console.log('check exit', checkExit)
        if(!checkExit) next()
        else return res.status(401).json({
            error: `${req.body.laptop_name} is exit`, 
            status: 0
        })
    } 
}

const schema = joi.object({
    laptop_name: joi.string().required(),
    status: joi.number().integer().required(),
    qty: joi.number().integer().required(),
    price: joi.number().float().required(),
    brand_id: joi.number().integer().required(),
    category: joi.required(),
    cpu: joi.string().required(),
    ram: joi.string().required(),
    rom: joi.string().required(),
    card_vga: joi.string().required(),
    webcam: joi.string().required(),
    connect: joi.string().required(),
    weight: joi.float().required(),
    pin: joi.string().required(),
    os: joi.string().required(),
    desc: joi.text().required(),
})

module.exports = validateLaptop