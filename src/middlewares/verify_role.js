export const  isAdmin = (req, res, next) => {   
    const user = req.user

    console.log(user)
    const role = user.user.Role.value
    if(role == "R1") next() 
    else {
        return res.status(403).json({
            status: 0,
            message: "You are not allowed to"
        })
    }
}

