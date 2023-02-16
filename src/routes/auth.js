import * as  controllers from '../controllers'
import express from 'express'
import validate from '../helpers/user_validation'
import { verifyToken } from '../middlewares/veryfi_token'

const route = express.Router()


route.post('/register',validate, controllers.register) 
route.get('/testJWT',verifyToken, controllers.register) 
module.exports =  route 