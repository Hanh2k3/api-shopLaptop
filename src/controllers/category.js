const categoryService = require('../services/category')
const db = require('../models')
const { internalServerError } = require('../middlewares/handle_errors')


const createCategory = async (req, res) => {
    try {
        console.log(req.body)
        const result = await categoryService.crateCategory(req.body)
      
        res.status(200).json(result)
    } catch (error) {
        return internalServerError(res, error)
    }
}


const getAllCategories = async (req, res) => {
    try {
        const { categories  } = await categoryService.getAll()
        return res.status(200).json({ 
            message: 'got categories',
            status: 1,
            categories: categories
        })
    } catch (error) {
        return internalServerError(res, error)
    }
}

const getCategory = async (req, res) => {
    try {
        const id = +req.params.id
        const { category } = await categoryService.getCategory(id)
        return res.status(200).json({
            message: category?'got a category':'not found',
            status: category ? 1: 0,
            category: category? category: null
        })
    } catch (error) {
        return internalServerError(res, error)
    }
}


const update = async (req, res) => {
    try {
        const id = +req.params.id
        const data = req.body
        await categoryService.update(id, data)

        const newCategory = await categoryService.getCategory(id)
        
        return res.status(200).json({ 
            message: 'updated successfully',
            category: newCategory.category,
            status:1
        })
    } catch (error) {
        return internalServerError(res, error)
    }
}

const remove = async (req, res) => {
    try {
        const id =  req.params.id
        await categoryService.remove(id)
        return res.status(200).json({
            message: 'delete successfully',
            status: 1
        })
    } catch (error) {
        return internalServerError(res, error)
    }
}



module.exports = {
   createCategory,
   getAllCategories,
   getCategory,
   update,
   remove
}