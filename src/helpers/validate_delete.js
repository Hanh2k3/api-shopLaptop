const db = require('../models')

export const checkExits = async  (req, res, next) => {

    try {
        const laptop = await db.Laptop.findByPk(+req.params.id)
        if(!laptop) {
            return res.json({
                status: 0,
                message: 'Laptop is not exit'
            })
        } else next()
    } catch (error) {
        
    }

}