const userRoute = require('./user')
const authRoute = require('./auth')
const categoryRoute = require('./category')
const brandRoute = require('./brand')
const laptopRoute = require('./laptop')
const cartRoute = require('./cart')
const orderRoute = require('./order')
const paymentRoute = require('./payment')
const sliderRoute = require('./slider')
const shippingRoute = require('./shipping')
const { notFound } = require('../middlewares/handle_errors')


const initRoute = (app) => {
    app.use('/api/v1/auth', authRoute)
    app.use('/api/v1/user', userRoute)
    app.use('/api/v1/shipping', shippingRoute)
    app.use('/api/v1/category', categoryRoute)
    app.use('/api/v1/brand', brandRoute)
    app.use('/api/v1/laptop', laptopRoute)
    app.use('/api/v1/cart', cartRoute)
    app.use('/api/v1/order', orderRoute)
    app.use('/api/v1/payment', paymentRoute)
    app.use('/api/v1/slider', sliderRoute)

       
    // app.use(notFound)
    app.use('/', (req, res) => {
        return res.send('Home page')
    })


}

module.exports = initRoute