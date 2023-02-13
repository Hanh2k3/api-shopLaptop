import * as  controllers from '../controllers'
import express from 'express'
const route = express.Router()


route.post('/register', controllers.register) 
module.exports =  route 