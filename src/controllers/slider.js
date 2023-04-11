const sliderService = require('../services/slider')
const handleError = require('../middlewares/handle_errors')


const insertSlider = async (req, res) => {
    try {

        const images = req.files 
        console.log(images)
        const data = images.map(item => {
            return {
                path: item.path,
                image_name: item.filename
            }
        })
        console.log(data)

        await sliderService.insertSlider(data)
        res.status(200).json({
            status: 1,
            message: 'Slider successfully'
        })
    } catch (error) {
        handleError.internalServerError(res, error)
    }

}

const getAllSlider = async (req, res) => {
    try {
        const slider = await sliderService.getAllSlider()
        return res.status(200).json({
            status : 1, 
            message : "get all slider success",
            data: slider
        })
    } catch (error) {
        handleError.internalServerError(res, error)
    }
}

module.exports = {
    insertSlider,
    getAllSlider
}