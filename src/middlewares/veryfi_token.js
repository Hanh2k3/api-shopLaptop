const jwt = require('jsonwebtoken')
const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const GooglePlusTokenStrategy = require('passport-google-plus-token');
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


// passport middleware with google get token data from token of google account
passport.use(new GooglePlusTokenStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
}, (accessToken,  refreshToken, profile, next) => {
    try {
        const user = {
            name: profile.displayName,
            type_account: 'Google',
            provider_id: profile.id,
            email: profile.emails[0].value
        }
        next(null, user)
    } catch (error) {
        next(error, false)
    }
   
}))
module.exports = passport
