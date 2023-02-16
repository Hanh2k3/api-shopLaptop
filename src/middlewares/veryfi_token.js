const jwt = require('jsonwebtoken')

export const verifyToken = (req, res, next) => {
    try {      
       const header = JSON.stringify(req.headers)
       const token = JSON.parse(header).authorization
       console.log(token)
       const decode = jwt.verify(token, process.env.JWT_SECRET)
       console.log(decode)     
    } catch (error) {  
        throw new Error(error.message)
    }  
}