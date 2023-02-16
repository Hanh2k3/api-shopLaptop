import joi from 'joi'
import db from '../models'

const validate = async  (req, res, next) => {
    const { error } = schema.validate(req.body)
    const isUnique = await db.User.findOne({where: {email: req.body.email}})
    console.log('error', error)
    if(error) {
        res.json({ error: error.message })
    } else {
        if(isUnique) {
            res.status(404).json({  message: "Email is exit" })
        } else  next()
    }
}


const schema = joi.object({
    name: joi.string().required(),
    password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    email: joi.string().email(), 
    repeat_password: joi.ref('password'),
    
})

module.exports = validate