import express from 'express';
const router = express.Router();
import {
    authenticateUser,
    authorization,
} from '../middlewares/authentication.js';

import {
    getAllOrders,
    getSingleOrder,
    getCurrentUserOrders,
    createOrder,
    updateOrder,
} from '../controllers/orderController';

router.post('/create' ,authenticateUser, createOrder)
router.get('/' , authenticateUser, authorization('admin'), getAllOrders)
router.get('/showAllMyOrders' ,authenticateUser, getCurrentUserOrders)
router.get('/:id' , authenticateUser, getSingleOrder)
router.patch('/:id' ,authenticateUser, updateOrder )



export default router;