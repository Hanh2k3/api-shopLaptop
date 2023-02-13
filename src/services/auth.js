
export const register = () => new Promise((resolve, reject) => {
    try {
        resolve({
            status: 1, 
            msg: 'register success'
        })
    } catch (error) {
        register(error)
    }
})