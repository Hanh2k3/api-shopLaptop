const joi = require('joi')

const validateCategory = (req, res, next) => {

    const { error } = schema.validate(req.body)
    if(error){
        res.status(400).json({ 
            error: error.message,
            status : 0 
        })
    } else next()
}

const schema = joi.object({
    category_name: joi.string().required(),
    status: joi.number().integer().required()
})

module.exports = validateCategory