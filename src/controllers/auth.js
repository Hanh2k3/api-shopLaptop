import * as services from '../services'

export const register = async (req, res) => {
    try {
        const result = await services.register()
        res.status(200).json({
            result: result
        })
    } catch (error) {
     
    }
}