const db = require('../models')

export const  getOne = (userId) => new Promise( async (resolve, reject) => {
    try {
        const user = await  db.User.findOne({
            where: { id: userId}, 
            attributes: {
                exclude: ['password', 'role_id'],
            },
            include : [
                {
                    model: db.Role,
                    foreignKey: 'role_id', 
                    attributes: {
                        exclude: ['id', 'createdAt', 'updatedAt']
                    }
                }
            ] ,
            raw: true,
            nest: true
        }) 
        resolve({
           user: user
        })
    } catch (error) {
        reject(error)
    }
})

export const getAllUser = () => new Promise ( async (resolve, reject) => {
    try {
        const user = await  db.User.findAll({
            attributes: {
                exclude: ['password', 'role_id'],
            },
            include : [
                {
                    model: db.Role,
                    foreignKey: 'role_id', 
                    attributes: {
                        exclude: ['id', 'createdAt', 'updatedAt']
                    }
                }
            ] ,
            raw: true,
            nest: true
        }) 
        resolve({
           user: user
        })
    } catch (error) {
        reject(error)
    }

})