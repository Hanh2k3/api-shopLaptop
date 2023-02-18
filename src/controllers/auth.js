const authService = require('../services/auth')
const db = require('../models')

const isOldUser = async (user) => {
    try { 
        const check = await db.User.findOne({
            where : {
                provider_id : user.provider_id
            }
        })
        
        if(check == null) return false
        else return true     
    } catch (error) {
        
    }
}

const isEmailExit = async (email) => {
    try {
        const check = await db.User.findOne({ where: { email: email}})
        
        if(check != null) return true
        return false 
    } catch (error) {
        
    }
}

const register = async (req, res) => {

        const data = req.body
        const { token } = await authService.register(data)
        res.setHeader('Authorization', token )
        return res.status(200).json({
            message: 'Register successfully'
        })
    
}

const loginGoogle = async (req, res) => {

    const user = req.user 

    // find user  
    const checkUser = await isOldUser(user)
    if(checkUser) {
        // update account into google    
    } else {
        // create new account
        const token = await authService.createAccountSocial(user)
        res.setHeader('Authorization', token)
    }    
    
    return res.status(200).json({
        message: 'Login successfully'
    })

}



const testJwt = async (req, res) => {
    console.log(req.user)
    return res.json({
        user: req.user
    })
}

module.exports = {
    register, 
    testJwt,
    loginGoogle
    
}