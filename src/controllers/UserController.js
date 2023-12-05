'use strict';
import User from "../models/User.js";
import StatusCodes from 'http-status-codes';
import bcrypt from "bcrypt";
import {attachCookiesToResponse, checkPermissions, createTokenUser} from "../utils/index.js";


const getAllUsers = async (req , res)=>{
    const users = await User.find({role:'user'}).select('-password')
    return res.status(StatusCodes.OK).json({users})
}

const getSingleUsers = async (req , res)=>{
    const user = await User.findOne({_id:req.params.id}).select('-password')
    if (!user){
        return res.status(StatusCodes.NOT_FOUND).json({msg : `there is no user with id : ${req.params.id}`})
    }
    checkPermissions(req.user , user._id)
    return res.status(StatusCodes.OK).json({user})
}

const showCurrentUsers = async (req , res)=>{
    res.status(StatusCodes.OK).json({user : req.user})
}
const updateUsers = async (req , res)=>{
    try {
        const {name, email} = req.body;
        if (!name || !email) {
            return res.status(StatusCodes.NOT_FOUND).json({msg: "please provide with  name and email"})
        }
        const user = await User.findOneAndUpdate({_id: req.user.userId}, {email, name}, {
            new: true,
            runValidators: true
        });
        // const payload = {name:name, email:email};
        const tokenUser = await createTokenUser(user)
        attachCookiesToResponse({res, user: tokenUser});
        return res.status(StatusCodes.OK).json({user})
    }catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({msg : "cant update user"});
    }
}
const updateUserPassword = async (req , res)=>{
    const {oldPass , newPass} = req.body;
    if(!oldPass || !newPass){
        return res.status(StatusCodes.NOT_FOUND).json({msg : "please provide with old password or new password"})
    }
    const user = await User.findOne({_id: req.user.userId})
    const oldPassCheck = await user.comparePassword(oldPass);
    if(!oldPassCheck){
        return res.status(StatusCodes.NOT_FOUND).json({msg : "password is not valid"})
    }
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPass, salt)
    await user.save()
    res.status(StatusCodes.OK).json({msg : 'password updated'})
}

export {
    getAllUsers,
    getSingleUsers,
    showCurrentUsers,
    updateUsers,
    updateUserPassword,
}