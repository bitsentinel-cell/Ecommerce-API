'use strict'
import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name : {
        type: String,
        trim: true,
        required: [true , 'please provide with valid name for product'],
        maxLength: [100, 'name cannot be more than 100 characters']
    },
    price:{
        type: Number,
        required: [true , 'please provide with valid price for product'],
        default:0,
    },
    description:{
        type: String,
        required: [true , 'please provide description for product'],
        maxLength: [1000, 'name cannot be more than 1000 characters']
    },
    image:{
        type: String,
        default: '/uploads/example.jpeg'
    },
    category:{
        type: String,
        required: [true , 'please provide with category for product'],
        enum: ['office' , 'kitchen' , 'bedroom']
    },
    company:{
        type: String,
        required: [true , 'please provide with company for product'],
        enum: {
            values:['ikea' , 'liddy' , 'marcos'],
            massage:'{VALUE} is not supported'
        }
    },
    colors:{
        type: [String],
        default:['#222'],
        required:true,

    },
    featured:{
        type: Boolean,
        default:false,
    },
    freeShipping:{
        type: Boolean,
        default:false
    },
    inventory:{
        type: Number,
        required: true,
        default:15,
    },
    averageRating:{
        type: Number,
        default:0
    },
    user:{
       type:mongoose.Types.ObjectId,
        ref:'User',
        required:true,
    },
},{timestamps:true})

const Product = mongoose.model('Product' , ProductSchema);

export default Product;