

const db = require('../models')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const hashPassword = (password) => {
    const salt = bcryptjs.genSaltSync(10)
    const hash = bcryptjs.hashSync(password, salt)
    return hash
}

export const encodeToken = async (data) => {
    try {
        const token = await jwt.sign({
                    user_id: data.id,
                    role_id:data.role_di
        }, process.env.JWT_SECRET, { expiresIn: '5h' })
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

export const login = async (email, password) => {
    try {
        const user = await db.User.findOne({ where: {email: email} })
        if(user!=null) {
            const { dataValues } = user
            const isPassword = bcryptjs.compareSync(password, dataValues.password)
            if(isPassword) {
                const token = await encodeToken(user)
                return token
            } else return false

        } else {
            return false
        }
        
    } catch (error) {
        
    }
}

// update account into google 
export const updateAccount = async (user_id, provider_id, type_account) =>  {
    try {
        const updateUser = await db.User.update({
            provider_id: provider_id,
            type_account: type_account,
        },{
            where : {
                id : user_id
            }
        })
        const data = {
            id : user_id,
            role_di: 2
        }
        const token = await encodeToken(data)
        return token
    } catch (error) {
        
    }    
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
        const { dataValues } = newUser
       
        const token = await encodeToken(dataValues)
        return token 
    } catch (error) {
        
    }
}

