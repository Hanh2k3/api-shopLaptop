// const cors = require('cors')
import cors from 'cors'
import express from 'express'

require('dotenv').config()
const routes = require('./src/routes')

const app = express()

// config allow into server
app.use(cors({
    origin: process.env.PORT,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
}))

// middleware 
app.use(express.json()) // get Data type Json
app.use(express.urlencoded({extended: true})) // convert data into Json

// set Route 
routes(app)

const port = process.env.PORT || 8080

app.listen(port, (req, res) => {
    console.log('Server is running ' + port )
})