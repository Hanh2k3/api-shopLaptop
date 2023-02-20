const userRoute = require('./user')
const authRoute = require('./auth')
const { notFound } = require('../middlewares/handle_errors')


const initRoute = (app) => {
    app.use('/api/v1/auth', authRoute)
    app.use('/user', userRoute)


   
    // app.use(notFound)
    app.use('/', (req, res) => {
        return res.send('Home page')
    })


}

module.exports = initRoute