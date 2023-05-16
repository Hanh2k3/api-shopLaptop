const db = require('../models')
const con = require('../config/db')

export const  getDefaultShipping = (user_id) =>  new Promise( async (resolve, reject) => {
    try {
        const sql = `select inforshippings.* from users  INNER JOIN userinforshippings on  userinforshippings.user_id = users.id
        INNER JOIN inforshippings on userinforshippings.inforShipping_id = inforshippings.id where users.id = ${user_id} and userinforshippings.status = ${1}` 
        con.query(sql, async (error, result) => {
            try {
                if(error) throw error
                else resolve(result)
                
            } catch (error) {
                reject(error)
                
            }
        })
    } catch (error) {

        reject(error)
    }

})

export const getAllAddress = (user_id) => new Promise( async (resolve, reject) => {
    try {

        const sql = `select * from userinforshippings left join inforshippings on userinforshippings.inforShipping_id = inforshippings.id Where userinforshippings.user_id = ${user_id}`
        con.query(sql, (err, rows) => {
            try {
                if(err) throw err
                resolve({
                    data: rows
                })
            } catch (error) {
                reject(error)
            }
        })
            
    } catch (error) {
        reject(error)
    }
})

export const updateStatus = (user_id) => new Promise( async (resolve, reject) => {
    try {
            await db.UserInforShipping.update( { status: 0 }, { where:  { user_id:  user_id } })
            resolve("oke");
    } catch (error) {
        reject(error)
    }
})

export const updateAddress = (user_id, inforShipping_id) => new Promise( async (resolve, reject) => {
    try {
            console.log("true")
            await db.UserInforShipping.update( 
                { status: 1 },
                 {  
                 where:   
                    {  user_id: user_id  , 
                       inforshipping_id : inforShipping_id
                    }
                }
                )
            resolve({
                status: 1 
            });
    } catch (error) {
        reject(error)
    }
})

