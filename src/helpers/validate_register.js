
const joi = require('joi')
const db = require('../models')
const handleError = require('../middlewares/handle_errors') 

const validate = async  (req, res, next) => {
    try {
        const { error } = schema.validate(req.body)
        const isUnique = await db.User.findOne({where: {email: req.body.email}})
        console.log(isUnique)
        if(error) {
           res.status(200).json({
            error: error.message,
            status : 0 
        })
        } else {
            if(isUnique) {
                res.status(200).json({  
                    message: "Email is exit", 
                    status : 0 
                })
            } else  next()
        }
    } catch (error) {
        handleError.internalServerError(res, error)
    }
    
}

const schema = joi.object({
    name: joi.string().required(),
    password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')).required(),
    email: joi.string().email(), 
    repeat_password: joi.ref('password')
})

module.exports = validate