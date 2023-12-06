'use strict';
import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
    rating:{
        type:String,
        min:1,
        max:5,
        required:[true , 'Please provide rating']
    },
    title:{
        type:String,
        trim:true,
        required:[true , 'Please provide review title'],
        maxLength:100,
    },
    comment:{
        type:String,
        required:[true , 'Please provide review text'],
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true,
    },
    product:{
        type:mongoose.Types.ObjectId,
        ref:'Product',
        required: true,
    }
},{timestamps:true})

ReviewSchema.index({user:1 , product:1},{unique :true} )

const Review = mongoose.model('Review' ,ReviewSchema);

export default Review;
