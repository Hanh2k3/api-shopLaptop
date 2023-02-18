const jwt = require('jsonwebtoken')
const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const db = require('../models/index')

// passport config toke JwtStrategy
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('Authorization'),
    secretOrKey: process.env.JWT_SECRET
}, async (jwt_payload, done) => {
    try {
        const id = jwt_payload.user_id 
        const user = await db.User.findOne({ where: { id: id}})
        if(user) done(null, user) 
        else done(null, false)
    } catch (error) {
        done(error, false)
    }
}))

// verify with method of jwt 
export const verifyToken = (req, res, next) => {
    try {      
       const header = JSON.stringify(req.headers)
       const token = JSON.parse(header).authorization
       console.log(token)
       const decode = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET)       
    } catch (error) {  
        throw new Error(error.message)
    }  
}

module.exports = passport
