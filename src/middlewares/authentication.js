'use strict';
import {isTokenValid} from "../utils/index.js";
import StatusCodes from 'http-status-codes';


const authenticateUser = async (req ,res , next) =>{
    const token = req.signedCookies.token;
    if(!token){
        return res.status(StatusCodes.UNAUTHORIZED).json({msg : 'no token found'})
    }
    try{
        // const payload = isTokenValid({token})
        const {name , userId , role } = isTokenValid({token});
        req.user = {name , userId , role}


        next()
    }catch (error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({msg : 'authentication has failed'})
    }

}


const authorization = (...roles)=>{
    return (req , res , next)=>{
        try {
            if(!roles.includes(req.user.role)){
                return res.status(StatusCodes.UNAUTHORIZED).json({msg: 'you are unauthorized here'})
            }
            const role = req.user.role
            if (role !== 'admin') {
                return res.status(StatusCodes.UNAUTHORIZED).json({msg: 'you are unauthorized here'})
            } else if (role === 'admin') {
                console.log('admin route')
            }
            next()
        }catch (error) {
            return res.status(StatusCodes.BAD_REQUEST).json({msg: 'authorization process has faild'})
        }
    }
}


export {
    authenticateUser,
    authorization
}