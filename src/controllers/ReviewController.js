'use strict';


const createReview = async (req,res) =>{
    return res.send('create review route')
}

const getAllReviews = async (req,res) =>{
    return res.send('get all reviews route')
}

const getSingleReview = async (req,res) =>{
    return res.send('get single review route')
}

const updateReview = async (req,res) =>{
    return res.send('update review route')
}

const deleteReview = async (req,res) =>{
    return res.send('delete review route')
}


export {
    createReview,
    getAllReviews,
    getSingleReview,
    updateReview,
    deleteReview
}