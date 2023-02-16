import db from '../models'


export const register = (email, password) => new Promise( async (resolve, reject)  => {
    try {
       
        const user = await db.User.findOrCreate({ 
            where: {email: email}, 
            defaults: {
                
            }
        })
        console.log(user)

        // registed return a token 
        resolve({
            status: 1, 
            msg: 'register success'
        })
    } catch (error) {
        register(error)
    }
})