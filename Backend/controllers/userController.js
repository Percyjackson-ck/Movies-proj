import User from "../models/User.js";
import bcrypt from "bcryptjs"
import asyncHandler  from "../middlewares/asyncHandller.js";
import createToken from "../utils/createToken.js";


const createUser=asyncHandler(async function abc(req,res){
    const {username,email,password}=req.body;
    if(!username || !email ||!password){
        throw new Error("Please fill all the fileds")

    }
    const userExits=await User.findOne({email})
    if(userExits) return res.status(400).send("User already exists")
    
        // Hash user Password

        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt)
     const newUser=new User({username,email,password:hashedPassword})
     try{
           await newUser.save()
           createToken(res,newUser._id)

           res.status(201).json({
            _id:newUser._id,
            username:newUser,
            email:newUser.email,
            isAdmin:newUser.isAdmin
           })
     } catch(error){
        res.status(400)
        throw new Error("Invalid user data")
     }
});  

export{createUser}