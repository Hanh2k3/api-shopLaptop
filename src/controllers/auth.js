import * as services from '../services'

export const register = async (req, res) => {
    try {
        const data = req.body
        const { token } = await services.register(data)
        res.setHeader('Authorization', token )
        return res.status(200).json({
            message: 'Register successfully'
        })
    } catch (error) {
        Error(error)
    }
}