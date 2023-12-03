'use strict';
import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true , 'username must be provided'],
        unique : true,
        trim : true,
        maxLength : [50, 'username must not bigger than 50 characters'],
        minLength: [2 , 'username must not shorter than 2 characters']

    },
    email:{
        type:String,
        required: [true , 'email must be provided'],
        validate:{
             validator:validator.isEmail,
             massage:'please provide a valid email'
        },
        unique: true,
        trim: true,
    },
    password:{
        type:String,
        required:[true , 'password must be provided'],
        minLength:[6 , 'password must not shorter than 6 characters'],

    },
    role:{
        type:String,
        enum:['admin' , 'user'],
        default:'user',
    },
})

UserSchema.methods.createJWT = function (){
    return  jwt.sign({userId : this._id,name:this.name, role:this.role},process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME});
}


UserSchema.methods.comparePassword = async function (pass){
    return await bcrypt.compare(pass, this.password)
}


const User = mongoose.model('User' , UserSchema);
export default User;