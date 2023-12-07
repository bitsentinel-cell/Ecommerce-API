'use strict';
import Product from "../models/Product.js";
import {StatusCodes} from "http-status-codes";
import path from 'path';
import { fileURLToPath } from 'url';
const createProduct = async (req , res) => {
    req.body.user = req.user.userId;
    const product = await Product.create(req.body);
    res.status(StatusCodes.CREATED).json({ product });
}

const getAllProducts = async (req , res) =>{
    const products = await Product.find({});
    res.status(StatusCodes.OK).json({ products, count: products.length });
}

const getSingleProduct = async (req , res) =>{
    try {
        const {id: productId} = req.params;
        const product = await Product.findOne({_id: productId})
        if (!product) {
            console.log('not found')
        }
        res.status(StatusCodes.OK).json({product});
    }catch (error){
        console.log('cant find')
    }
}

const updateProduct = async (req , res) =>{
    const { id: productId } = req.params;

    const product = await Product.findOneAndUpdate({ _id: productId }, req.body, {
        new: true,
        runValidators: true,
    });

    if (!product) {
        return res.status(StatusCodes.NOT_FOUND).json({msg : `there is no product with this id : ${productId}`})
    }

    res.status(StatusCodes.OK).json({ product });
}

const deleteProduct = async (req , res) =>{

        const {id: productId} = req.params;
        const product = await Product.findOne({_id: productId});
        if (!product) {
            return res.status(StatusCodes.NOT_FOUND).json({msg: `the product not found with the id of : ${productId}`})
        }
        await product.deleteOne()
        res.status(StatusCodes.OK).json({msg: 'Success! Product removed.'});

}


const uploadImage = async (req , res) =>{

    if (!req.files) {
        return res.status(StatusCodes.NOT_FOUND).json({msg : 'no file uploaded'})
    }
    const productImage = req.files.image;
    if (!productImage.mimetype.startsWith('image')) {
        return res.status(StatusCodes.NOT_FOUND).json({msg : 'please upload an image'})
    }
    const maxSize = 1024 * 1024;
    if (productImage.size > maxSize) {
        return res.status(StatusCodes.NOT_FOUND).json({msg : 'please an image smaller than 1mg'})
    }
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const imagePath = path.join(
        __dirname,
        '../public/uploads/' + `${productImage.name}`
    );
    await productImage.mv(imagePath);
    res.status(StatusCodes.OK).json({ image: `/uploads/${productImage.name}` });
}

export {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    uploadImage
}