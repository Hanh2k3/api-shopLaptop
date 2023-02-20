const db = require('../models')

export const  getOne = (userId) => new Promise( async (resolve, reject) => {
    try {

        const user = await  db.User.findOne({
            where: { id: userId},
          
            include : [
                {
                    model: db.Role,
                    foreignKey: 'role_id'
                }
            ]
            
        })       
        resolve({
           user: user
        })
    } catch (error) {
        reject(error)
    }
})