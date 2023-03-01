const laptopService = require('../services/laptop')
const detailLaptopService = require('../services/detailLaptop')
const categoryLaptop = require('../services/categoryLaptop')
const handleError = require('../middlewares/handle_errors')


const create = async (req, res) => {
    try {
        
        console.log(req.files)

        const files = req.files
        const paths = []
        for (const file of files) {
            const { path } = file
            paths.push(path)
        }
        return res.status(200).json({ 
            paths: paths
        })


        // insert data into table detail laptop
        const { detail_id } = await detailLaptopService.crateDetailLaptop(req.body.detail_laptop)

        //insert data into table laptop
        let laptop_data = req.body.laptop
        laptop_data.detail_id = detail_id
        const { laptop_id } = await laptopService.createLaptop(laptop_data)

        //insert data into table category laptop
        const category_id = req.body.category_id.value
        category_id.forEach( async(item) => {
            const data = {
                category_id: item,
                laptop_id: laptop_id
            }
         
            await categoryLaptop.crateCategoryLaptop(data)
        })

        const { laptop }  = await laptopService.getLaptop(laptop_id)
        
        res.status(200).json({
            message: 'Laptop created  successfully',
            laptop: laptop,
            status: 1
        })
    } catch (error) {
        handleError.internalServerError(res, error)
    }
}

// update laptop 
const updateLaptop = async (req, res) => {
    try {
        const laptop_id = req.params.id
        const data = req.body
        const { laptop  } = await laptopService.updateLaptop(data, laptop_id)
        return res.status(200).json({
            status: 1,
            message: "Update oke",
            laptop: laptop
        })

        
    } catch (error) {
        handleError.internalServerError(res, error)
        
    }
}

const getOne = async (req, res) => {
    try {
        const id = req.params.id
        const { laptop } = await laptopService.getLaptop(id)
        res.status(200).json({
            message: 'Laptop get  successfully',
            laptop: laptop,
            status: 1
        })

    } catch (error) {
        handleError.internalServerError(res, error) 
    }
}

// delete laptop
const deleteLaptop = async (req, res) => {
    try {
        const id = +req.params.id
        console.log('id', id) 
        await  laptopService.deleteLaptop(id)
        
        return res.status(200).json({
            status: 1,
            message: 'delete ok'
        })
    } catch (error) {
        handleError.internalServerError(res, error)
    }

}

// get list laptop
const getListLaptops = async (req, res) => {
    try {
        
        const { laptops } = await laptopService.getListLaptops(req.query)
       
        return res.status(200).json({ 
            message: 'got list laptop',
            laptop: laptops,
            status: 1
        })
    } catch (error) {
        
        handleError.internalServerError(res, error)
    }
}

module.exports = {
    create,
    updateLaptop,
    deleteLaptop,
    getOne,
    getListLaptops
}