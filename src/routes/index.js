import userRoute from './user'
import authRoute from './auth'




const initRoute = (app) => {

    app.use('/api/v1/auth', authRoute)
    app.use('/user', userRoute)
    return app.use('/', (req, res) => {
        return res.send('Home page')

    })
}

module.exports = initRoute