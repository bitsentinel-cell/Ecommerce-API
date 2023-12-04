'use strict';

import express from 'express';
import {getAllUsers,
    getSingleUsers,
    showCurrentUsers,
    updateUsers,
    updateUserPassword} from '../controllers/UserController.js';


const router = express.Router();

router.get('/' , getAllUsers);
router.get('/showMe' , showCurrentUsers);
router.get('/:id' , getSingleUsers);
router.patch('/updateUser' , updateUsers);
router.patch('/updateUserPassword' , updateUserPassword);

export default router;

