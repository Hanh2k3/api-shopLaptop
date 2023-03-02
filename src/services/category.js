import express from 'express'

const db = require('../models')

// create
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

// read 
export const getAll = () => new Promise( async (resolve, reject) => {
    try {
        const categories = await db.Category.findAll({ 
            raw: true,
            nest: true
        })
        resolve({
            categories: categories
        })
    } catch (error) {
        reject(error)
    }
})

export const  getCategory = (id) => new Promise(async (resolve, reject) => {
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

// update
export const update = (id, data) => new Promise( async (resolve, reject) => {
    try {
        console.log('id',id, data)
        const category = await db.Category.update(data, { where: { id: id }})
      
        resolve({
            category: category
        })
    } catch (error) {
        reject(error)
    }
})

export const remove = (id) => new Promise( async (resolve, reject) => {
    try {
        const result = await db.Category.destroy({
            where: {id: id},
            force: true
        })
        resolve({
            status: 1
        })
    } catch (error) {
        reject(error)
    }
})