import * as services from '../services'

export const register = async (req, res) => {
    try {
        const { email, password } = req.body
       // const result = await services.register(email, password)
        res.status(200).json({
            result: 'true'
        })
    } catch (error) {
     
    }
}