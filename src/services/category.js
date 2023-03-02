import express from 'express'

const db = require('../models')

export const crateCategory = (data) => new Promise( async (resolve, reject) => {
    try {
       const category = await db.Category.create(data)
       resolve({
        message: "Create category successfully",
        category: category,
        status: 1
       })
    } catch (error) {
        console.log(error)
        reject(error)
    }
})

export const getCategory = (id) => new Promise(async (resolve, reject) => {
    try {
        const category = await db.Category.findOne({ 
            where: { id: id},
            raw: true,
            nest: true
        })
        resolve({
            category: category
        })
    } catch (error) {
        reject(error)
    }
})

export const getListCategory = (list_id) => new Promise( async(resolve, reject) => {
    try {
        const list = await db.Category.findAll({ 
            where : {id: list_id},
            raw: true,
            nest: true
        })

        resolve({
            list_categories: list
        })
    } catch (error) {
        reject(error)
    }
})
