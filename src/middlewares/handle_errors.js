const createError = require('http-errors')

const badRequest = (err, res) => {
    const error = createError.badRequest(err)
    return res.status(error.status).json({ 
        status: 0,
        message: err.message
    })
}

export const internalServerError = (res) => {
    const error = createError.InternalServerError()
    return res.status(error.status).json({
        status: 0,
        message: error.message 
    })
}

export const notFound = (req, res) => {
    const error = createError.NotFound('This route is not defined')
    return res.status(error.status).json({
        status: 0,
        error: error.message
    }) 
}

export const notAuth = (err, res) => {
    const error = createError.Unauthorized(err)
    return res.status(error.status).json({
        error: error.message, 
        status: 0 
    })
}



