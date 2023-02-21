module.exports = function(req, res, next) {
    const { authorization } = req.headers
    if(authorization) next()
    else {
        console.log(authorization)
        res.status(201).json({ 
            status: 0 ,
            message: "Not token not login"
         })
    }
}