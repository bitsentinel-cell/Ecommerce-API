'use strict';

import express from "express";
import {authenticateUser} from "../middlewares/authentication.js";
import {
    createReview,
    getAllReviews,
    getSingleReview,
    updateReview,
    deleteReview} from '../controllers/ReviewController.js'
const router = express.Router();


router.post('/create',authenticateUser , createReview);
router.get('/',getAllReviews );
router.get('/:id' ,getSingleReview );
router.patch('/:id' ,authenticateUser, updateReview);
router.delete('/:id',authenticateUser ,deleteReview);


export default router;