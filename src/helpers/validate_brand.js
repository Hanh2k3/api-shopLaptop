const joi = require('joi')
const db = require('../models')
const handleError = require('../middlewares/handle_errors')


const isBrandExit = async (brand_name, res) =>  {
    try {
        const brand = await db.Brand.findOne({ where : { brand_name } })
        if(brand === null ) {
            return false
        } else return true
    } catch (error) {
        handleError.badRequest(error, res)
    }
}
const validateBrand = async (req, res, next) => {
    const { error } = schema.validate(req.body)
    if(error){
        res.status(400).json({ 
            error: error.message,
            status : 0 
        })
    } else {
        const checkExit = await isBrandExit(req.body.brand_name, res)
        console.log('check exit', checkExit)
        if(!checkExit) next()
        else return res.status(401).json({
            error: `${req.body.brand_name} is exit`, 
            status: 0
        })
    } 
}

const schema = joi.object({
    brand_name: joi.string().required(),
    status: joi.number().integer().required()
})

module.exports = validateBrand