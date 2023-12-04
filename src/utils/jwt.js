'use strict'
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config()
const createJWT = ({payload}) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME})
}
const isTokenValid = ({token}) => {
     return  jwt.verify(token ,process.env.JWT_SECRET )
}

const attachCookiesToResponse = ({ res , user}) => {
    const token = createJWT({payload:user})
    const oneDay = 1000 * 60 * 60 * 24
     res.cookie('token' , token , {
        httpOnly:true,
        expires: new Date(Date.now() + oneDay)
    })

}
export {
    createJWT,
    isTokenValid,
    attachCookiesToResponse
}