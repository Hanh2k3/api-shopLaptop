const db = require('../models')
const con = require('../config/db')

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

export const getAllAddress = (user_id) => new Promise( async (resolve, reject) => {
    try {

        const sql = `select * from userinforshippings left join inforshippings on userinforshippings.inforShipping_id = inforshippings.id Where userinforshippings.user_id = ${user_id}`
        con.query(sql, (err, rows) => {
            try {
                if(err) throw err
                resolve({
                    data: rows
                })
            } catch (error) {
                reject(error)
            }
        })
            
    } catch (error) {
        reject(error)
    }
})