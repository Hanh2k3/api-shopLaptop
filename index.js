// const cors = require('cors')
const  cors = require('cors')
const  express = require('express')
const  bodyParser = require('body-parser')
const multipart = require('connect-multiparty')
const multipartMiddleware = multipart()
const con = require('./src/config/db')

require('dotenv').config()
const routes = require('./src/routes')

// connect to database
con.connect()

const app = express()

// config allow into server
app.use(cors({
    origin: process.env.PORT,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
}))

// middleware 
app.use(express.json()) // get Data type Json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// app.use(multipartMiddleware)
// app.use(bodyParser.text({ type: '/' }))


// set Route 
routes(app)

const port = process.env.PORT || 8080

app.listen(port, (req, res) => {
    console.log('Server is running ' + port )
})