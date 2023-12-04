'use strict';
import StatusCodes from 'http-status-codes'
import User from "../models/User.js";
import bcrypt from "bcrypt";
import {attachCookiesToResponse} from "../utils/index.js"

const register = async (req,res)=>{
    try{
        const {name , email , password} = req.body
        const emailAlreadyExist = await User.findOne({email});
        if(emailAlreadyExist){
            return res.status(StatusCodes.BAD_REQUEST).json({msg : "email is already exist"})
        }
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);
        const user = await User.create({
            name : name,
            email: email,
            password: hashed
        });
        user.save()
        const payload = {name:name, email:email}
        attachCookiesToResponse({res, user:payload})
        return  res.status(StatusCodes.CREATED).json({user})

    }catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({msg : "cant create user"})
    }
}
const login = (req,res)=>{
    try{
        return res.status(StatusCodes.OK).json({msg : 'you just hit the login route'})
    }catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({msg : "cant login the user"})
    }
}
const logout = (req,res)=>{
    try{
        return res.status(StatusCodes.OK).json({msg : 'you just hit the logout route'})
    }catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({msg : "cant logout the user"})
    }
}

export {
    register,
    login,
    logout
}