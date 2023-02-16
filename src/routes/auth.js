import * as  controllers from '../controllers'
import express from 'express'
import validate from '../helpers/user_validation'
const route = express.Router()


route.post('/register',validate, controllers.register) 
module.exports =  route 