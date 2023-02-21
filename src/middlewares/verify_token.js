const jwt = require('jsonwebtoken')
const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const GooglePlusTokenStrategy = require('passport-google-plus-token');
const FacebookTokenStrategy = require('passport-facebook-token');
const db = require('../models/index')
const { notAuth } = require('./handle_errors')
const { getOne } = require('../services/user')


// passport config toke JwtStrategy
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('Authorization'),
    secretOrKey: process.env.JWT_SECRET
}, async (jwt_payload, done) => {
    try {
        const id = jwt_payload.user_id 
        //const user = await db.User.findOne({ where: { id: id}})
        const user = await getOne(id) 
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
            provider_id:  profile.id,
            email: profile.emails[0].value
        }
        next(null, user)
    } catch (error) {
        notAuth("Token invalid")
    }
   
}))



// Passport use FacebookToken Strategy
// passport.use(new FacebookTokenStrategy({
//     clientID: process.env.FACEBOOK_CLIENT_ID,
//     clientSecret: process.env.FACEBOOK_CLIENT_SECRET,

// }, (accessToken, refreshToken, profile, done) => {

//     try {
//         console.log(profile)
        
//     } catch (error) {
//         done(null, error)
//     }

// }))

module.exports = passport
