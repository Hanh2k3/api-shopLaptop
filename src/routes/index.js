const userRoute = require('./user')
const authRoute = require('./auth')
const categoryRoute = require('./category')
const brandRoute = require('./brand')
const laptopRoute = require('./laptop')
const cartRoute = require('./cart')
const { notFound } = require('../middlewares/handle_errors')


const initRoute = (app) => {
    app.use('/api/v1/auth', authRoute)
    app.use('/user', userRoute)
    app.use('/api/v1/category', categoryRoute)
    app.use('/api/v1/brand', brandRoute)
    app.use('/api/v1/laptop', laptopRoute)
    app.use('/api/v1/cart', cartRoute)
       
    // app.use(notFound)
    app.use('/', (req, res) => {
        return res.send('Home page')
    })


}

module.exports = initRoute