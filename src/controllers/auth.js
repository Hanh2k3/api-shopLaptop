const authService = require('../services/auth')
const db = require('../models')

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

        const data = req.body
        const { token } = await authService.register(data)
        res.setHeader('Authorization', token )
        return res.status(200).json({
            message: 'Register successfully',
            status : 1
        })   
}

const login = async (req, res) => {

    const { email, password } = req.body 

    const token = await authService.login(email, password)
    if(!token) {
        return res.status(401).json({
            status: 0, 
            error: 'Email or password invalid'
        })
    } else {
        res.setHeader('Authorization', token)
        return res.status(200).json({
            status: 1, 
            message: 'Login success'
        })
    }
  
}

const loginGoogle = async (req, res) => {

    const user = req.user 

    // find user  
    const checkUser = await isOldUser(user)
    console.log(checkUser)
    if(checkUser != null ) {
        // login when account exit 
        const { dataValues} = checkUser
        const token = await authService.encodeToken(dataValues)
        res.setHeader('Authorization', token) 
    } else {
        // check email is used create account 
        const user_id = await isEmailExit(user.email)
        console.log('user_id', user_id)
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
    loginGoogle,
    login
    
}