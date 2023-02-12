const userRoute = require('./user')



const initRoute = (app) => {

    app.use('/user', userRoute)
    return app.use('/', (req, res) => {
        return res.send('Home page')

    })
}

module.exports = initRoute