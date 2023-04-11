const authService = require('../services/auth')
const db = require('../models')
const { internalServerError } = require('../middlewares/handle_errors')

const isOldUser = async (user) => {
    try { 
        const check = await db.User.findOne({
            where : {
                provider_id : user.provider_id
            }
        })
       return check 
    } catch (error) {
        
        
    }
}

const isEmailExit = async (email) => {
    try {
        const user = await db.User.findOne({ where: { email: email}})
       
        if(user == null) {
            return 0 

        } else {
            const { dataValues } = user
            return dataValues.id
        }  
    } catch (error) {
        
    }
}

const register = async (req, res) => {
    try {
        const data = req.body
        
        const { token } = await authService.register(data)
        res.setHeader('Authorization', token )
        return res.status(200).json({
            message: 'Register successfully',
            status : 1
        })     
    } catch (error) {
        return internalServerError(res, error)
    }

        
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body 
        console.log("Email ", email)
        const token = await authService.login(email, password)
        if(!token) {
        return res.status(200).json({
                status: 0, 
                message: 'Email or password invalid'
            })
        } else {
            res.setHeader('Authorization', token)
            return res.status(200).json({
                status: 1, 
                message: 'Login success'
                })
        }
        
    } catch (error) {
        return internalServerError(res)
    }

}

const loginGoogle = async (req, res) => {
    try {
        const user = req.user 
        // find user  
        const checkUser = await isOldUser(user)
        if(checkUser != null ) {
            // login when account exit 
            const { dataValues} = checkUser
            const token = await authService.encodeToken(dataValues)
            res.setHeader('Authorization', token) 
        } else {
            // check email is used create account 
            const user_id = await isEmailExit(user.email)

            if(user_id == 0 ) {
                const token = await authService.createAccountSocial(user)
                res.setHeader('Authorization', token) 

            } else {
                // update account into google
                const token = await authService.updateAccount(user_id, user.provider_id, 'Google')
                res.setHeader('Authorization', token)
            }
        }     
        return res.status(200).json({
            message: 'Login successfully',
            status : 1
        })
        
    } catch (error) {
        return internalServerError(res)
        
    }    
}

const loginFacebook =  async (req, res) => {


}

const testJwt = async (req, res) => {
    try {
        return res.json({
            user: req.user
        })
        
    } catch (error) {
        return internalServerError(res)
        
    }
 
}

module.exports = {
    register, 
    testJwt,
    loginGoogle,
    login
}