import e from 'express';

const db = require('../models')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const hashPassword = (password) => {
    const salt = bcryptjs.genSaltSync(10);
    const hash = bcryptjs.hashSync(password, salt)
    return hash
}

const encodeToken = async (data) => {
    try {
        const token = await jwt.sign({
                    user_id: data.id,
                    role_id:data.role_di
        }, process.env.JWT_SECRET, { expiresIn: '1d' })
        return 'Bearer '  + token
    } catch (error) {
        
    }
}

export const register = (data) => new Promise( async (resolve, reject)  => {
    try {    
        const newUser = await db.User.create({
            name: data.name,
            email: data.email,
            password: hashPassword(data.password),
            role_id: 2
        })
        const { dataValues } = newUser
        const token = await encodeToken(dataValues)
        resolve( {
            token: token
        })
    } catch (error) {
        reject(error)
    }
})

// update account into google 
export const updateAccountGoogle = (user) =>  {

    


}

export const  createAccountSocial =  async (user) => {
    try {
        const newUser = await db.User.create({
            name: user.name,
            email: user.email,
            role_id: 2,
            provider_id: user.provider_id, 
            type_account: user.type_account
        })
        console.log('newUser',newUser)
        const { dataValues } = newUser
        const token = await encodeToken(dataValues)
        return token 
    } catch (error) {
        
    }
}