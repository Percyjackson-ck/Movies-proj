import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import asyncHandler from './asyncHandller.js'


//check if the user is authenticated or not 

const authenticate=asyncHandler(async(req,res,next)=>{
    let token;
    // console.log('Cookies:', req.cookies);

    //Read JWT from the 'jwt cookie
    token=req.cookies.jwt
    // console.log('Extracted Token:', token);
    if(token){
        try{
     const decoded=jwt.verify(token,process.env.JWT_SECRET)
       req.user=await User.findById(decoded.userId).select("-password");
       next();
        }catch(error){
            res.status(401)
            throw new Error("Not auhtorized ,token failed")
        }
    }
    else{
        res.status(401)
        throw new Error("Not authorized,no token")
    }
});

//Check if the user is admin or not

const authorizeAdmin=(req,res,next)=>{
    if(req.user && req.user.isAdmin){
        next()
    }else{
        res.status(401).send("Not authorized as an admin");
    }
}

export {authenticate,authorizeAdmin};