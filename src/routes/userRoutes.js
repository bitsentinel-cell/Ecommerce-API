'use strict';

import express from 'express';
import {getAllUsers,
    getSingleUsers,
    showCurrentUsers,
    updateUsers,
    updateUserPassword} from '../controllers/UserController.js';
import {authorization , authenticateUser} from "../middlewares/authentication.js";

const router = express.Router();

router.get('/' ,authenticateUser, authorization('admin' ), getAllUsers);
router.get('/showMe' , authenticateUser , showCurrentUsers);
router.get('/:id' ,authenticateUser, getSingleUsers);
router.patch('/updateUser' ,authenticateUser , updateUsers);
router.patch('/updateUserPassword', authenticateUser , updateUserPassword);

export default router;

