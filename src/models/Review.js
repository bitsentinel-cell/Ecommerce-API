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

ReviewSchema.statics.calculateAverageRating = async function (productId) {
    const result = await this.aggregate([
        { $match: { product: productId } },
        {
            $group: {
                _id: null,
                averageRating: { $avg: '$rating' },
                numOfReviews: { $sum: 1 },
            },
        },
    ]);

    try {
        await this.model('Product').findOneAndUpdate(
            { _id: productId },
            {
                averageRating: Math.ceil(result[0]?.averageRating || 0),
                numOfReviews: result[0]?.numOfReviews || 0,
            }
        );
    } catch (error) {
        console.log(error);
    }
};

ReviewSchema.post('save' , {document : true , query:false} ,async function(next){
    await this.constructor.calculateAverageRating(this.product);

})

ReviewSchema.post('deleteOne' , {document : true , query:false} ,async function(next){
    await this.constructor.calculateAverageRating(this.product);

})


const Review = mongoose.model('Review' ,ReviewSchema);
export default Review;
