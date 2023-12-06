'use strict';
import StatusCodes from 'http-status-codes';
import User from "../models/User.js";
import bcrypt from "bcrypt";
import {attachCookiesToResponse , createTokenUser} from "../utils/index.js"

const register = async (req,res)=>{
    try{
        const {name , email , password} = req.body
        const emailAlreadyExist = await User.findOne({email});
        if(emailAlreadyExist){
            return res.status(StatusCodes.BAD_REQUEST).json({msg : "email is already exist"});
        }
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);
        const user = await User.create({
            name : name,
            email: email,
            password: hashed
        })

        user.save();
        const tokenUser = await createTokenUser(user)
        attachCookiesToResponse({res, user:tokenUser});
        return  res.status(StatusCodes.CREATED).json({user});
    }catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({msg : "cant create user"});
    }
}
const login = async (req,res)=>{
    try{
        const {name, email ,password} = req.body
        if(!email || !password){
            return res.status(StatusCodes.NOT_FOUND).json({msg : "please provide with email and password"})
        }
        const user = await User.findOne({email});

        if (!user){
            return res.status(StatusCodes.NOT_FOUND).json({msg : "user not found"})
        }
        const isPasswordCorrect = await user.comparePassword(password);
        console.log(isPasswordCorrect)
        if (!isPasswordCorrect){
            return res.status(StatusCodes.NOT_FOUND).json({msg : "password is not valid"})
        }
        const tokenUser = await createTokenUser(user)
        attachCookiesToResponse({res, user:tokenUser});
        return res.status(StatusCodes.OK).json({user});
    }catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({msg : "cant login the user"});
    }
}
const logout = (req,res)=>{
    try{
        res.cookie('token' , 'logout' ,{
           httpOnly:true,
           expires: new Date(Date.now())
        });
        return res.status(StatusCodes.OK).json({msg : 'user just logged out'});
    }catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({msg : "cant logout the user"});
    }
}

export {
    register,
    login,
    logout
}