export const  isAdmin = (req, res, next) => {   
    const user = req.user
    const role = user.user.dataValues.Role.dataValues.value
    if(role == "R1") next() 
    else {
        return res.status(403).json({
            status: 0,
            message: "You are not allowed to"
        })
    }
}

