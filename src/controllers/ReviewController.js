'use strict';
import Product from "../models/Product.js";
import Review from "../models/Review.js";
import checkPermissions from '../utils/checkPermissions.js'

import StatusCodes from 'http-status-codes';
const createReview = async (req,res) =>{
    const {product : productId} = req.body;
    const isValidProduct = await Product.findOne({_id : productId})
    if(!isValidProduct){
        return res.status(StatusCodes.NOT_FOUND).json({msg : `there is no product with the id : ${productId}`})
    }
    const alreadySubmitted = await Review.findOne({
        product:productId , user : req.user.userId
    })
    if (alreadySubmitted){
        return res.status(StatusCodes.BAD_REQUEST).json({msg : 'you are already have one review on this post'})
    }
    req.body.user = req.user.userId;
    const review = await Review.create(req.body);
    res.status(StatusCodes.CREATED).json({review})

}

const getAllReviews = async (req,res) =>{
    const reviews = await Review.find({}).populate({
        path: 'product',
        select: 'name company price',
    }).populate({
        path: 'user',
        select : 'name email'
    })
    res.status(StatusCodes.OK).json({ reviews, count: reviews.length });
}

const getSingleReview = async (req,res) =>{
    const { id: reviewId } = req.params;
    const review = await Review.findOne({ _id: reviewId });
    if (!review) {
        return res.status(StatusCodes.NOT_FOUND).json({msg : `No review with id ${reviewId}`})
    }
    res.status(StatusCodes.OK).json({ review });
}

const updateReview = async (req,res) =>{
    const { id: reviewId } = req.params;
    const { rating, title, comment } = req.body;
    const review = await Review.findOne({ _id: reviewId });
    if (!review) {
        return res.status(StatusCodes.NOT_FOUND).json({msg : `the review not found with the id of : ${reviewId}`})
    }
    checkPermissions(req.user, review.user);

    review.rating = rating;
    review.title = title;
    review.comment = comment;

    await review.save();
    res.status(StatusCodes.OK).json({ review });
}

const deleteReview = async (req,res) =>{
    const { id: reviewId } = req.params;
    const review = await Review.findOne({ _id: reviewId });
    if (!review) {
        return res.status(StatusCodes.NOT_FOUND).json({msg : `the review not found with the id of : ${reviewId}`})
    }

    checkPermissions(req.user, review.user);
    await review.deleteOne();
    res.status(StatusCodes.OK).json({ msg: 'Success! Review removed' });
};

const getSingleProductReviews = async (req, res) => {
    const { id: productId } = req.params;
    const reviews = await Review.find({ product: productId });
    res.status(StatusCodes.OK).json({ reviews, count: reviews.length });
}


export {
    createReview,
    getAllReviews,
    getSingleReview,
    updateReview,
    deleteReview,
    getSingleProductReviews
}