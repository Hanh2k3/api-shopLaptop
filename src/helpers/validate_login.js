const joi = require('joi')

const validateLogin = (req, res, next) => {
    console.log(req.body.email)

    const { error } = schema.validate(req.body)
    if(error){
        res.status(400).json({ 
            error: error.message,
            status : 0 
        })
    } else next()
}

const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required()
})

module.exports = validateLogin

