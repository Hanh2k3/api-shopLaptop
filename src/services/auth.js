import db from '../models'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

const hashPassword = (password) => {
    const salt = bcryptjs.genSaltSync(10);
    const hash = bcryptjs.hashSync(password, salt)
    return hash
}

export const register = (data) => new Promise( async (resolve, reject)  => {
    try {  
        console.log(data)   
        const newUser = await db.User.create({
            name: data.name,
            email: data.email,
            password: hashPassword(data.password),
            role_id: 2
        })
        const { dataValues } = newUser
        const token = await jwt.sign({
                                user_id: dataValues.id,
                                role_id:dataValues.role_di
                            }, process.env.JWT_SECRET, { expiresIn: '1d' })
        console.log(token)
        resolve( {
            token: 'Bearer ' + token
        })
        
    } catch (error) {
        reject(error)
    }
})