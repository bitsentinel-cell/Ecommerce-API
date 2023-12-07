'use strict';

import express from "express";
import {authorization , authenticateUser} from "../middlewares/authentication.js";
import {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    uploadImage } from '../controllers/ProductController.js';

import {getSingleProductReviews} from '../controllers/ReviewController.js'
const router = express.Router();


router.post('/create' ,authenticateUser, createProduct);
router.get('/' ,authenticateUser,authorization('admin'), getAllProducts);
router.get('/:id' , getSingleProduct);
router.patch('/:id' ,authenticateUser,authorization('admin'), updateProduct);
router.delete('/:id' ,authenticateUser,authorization('admin'), deleteProduct);
router.post('/imageUpload' , uploadImage)



router.get('/:id/reviews' , getSingleProductReviews);

export default router;