import mongoose from "mongoose";
const userSchmea=mongoose.Schema({
    
        username:{
            type:String,
            require:true,
        },
        email:{
            type:String,
            require:true,
            unique:true
        }
    
})