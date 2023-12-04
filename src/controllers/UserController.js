'use strict';
import User from "../models/User.js";
import StatusCodes from 'http-status-codes';

const getAllUsers = async (req , res)=>{
    const users = await User.find({role:'user'}).select('-password')
    return res.status(StatusCodes.OK).json({users})
}

const getSingleUsers = async (req , res)=>{
    const user = await User.findOne({_id:req.params.id}).select('-password')
    if (!user){
        return res.status(StatusCodes.NOT_FOUND).json({msg : `there is no user with id : ${req.params.id}`})
    }
    return res.status(StatusCodes.OK).json({user})
}

const showCurrentUsers = async (req , res)=>{
    return res.send('show current user')
}

const updateUsers = async (req , res)=>{
    return res.send(req.body)
}

const updateUserPassword = async (req , res)=>{
    return res.send(req.body)
}


export {
    getAllUsers,
    getSingleUsers,
    showCurrentUsers,
    updateUsers,
    updateUserPassword,
}