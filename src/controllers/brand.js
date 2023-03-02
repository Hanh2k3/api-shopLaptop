const brandService = require('../services/brand')
const handleError = require('../middlewares/handle_errors')



const create = async (req, res) => {
    try {
        const result = await brandService.createBrand(req.body)
        res.status(200).json(result)
    } catch (error) {
        handleError.internalServerError(res, error)
    }
}

const update = async (req, res) => {
    try {
        const brand_id = req.params.id 
        const data = req.body
        await brandService.update(brand_id, data)
        const newBrand = await brandService.getBrand(brand_id)

        return res.status(200).json({
            message: 'update successfully',
            status: 1,
            brand: newBrand.brand
        })
        
    } catch (error) {
        handleError.internalServerError(res, error)
        
    }
}

const getBrand = async (req, res) => {
    try {
        const { brand } = await brandService.getBrand(+req.params.id)
        return res.status(200).json({
            message: brand? 'got a brand ': 'not found',
            status: brand? 1: 0,
            brand: brand?brand: null
        })
    } catch (error) {
        handleError.internalServerError(res, error)
    }
}

const getAllBrands = async (req, res) => {
    try {
        const { brands } = await brandService.getAllBrands()
        return res.status(200).json({
            message: brands? 'got a brands ': 'not found',
            status: brands? 1: 0,
            brands: brands?brands: null
        })
    } catch (error) {
        handleError.internalServerError(res, error)
    }
}

const remove = async (req, res) => {
    try {
        const id = +req.params.id
        const rs = await brandService.remove(id)
        return res.status(200).json({
            message: 'remove successful',
            status: 1
        })
        
    } catch (error) {
        handleError.internalServerError(res, error)
        
    }
}

module.exports = {
    create,
    getBrand,
    getAllBrands,
    update,
    remove
}