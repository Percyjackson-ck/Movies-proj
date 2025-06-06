import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true, // corrected here
    },
    email: {
        type: String,
        required: true, // corrected here
        unique: true
    },
    password: {
        type: String,
        required: true, // corrected here
    },
    isAdmin: {
        type: Boolean,
        required: true ,
        default:false
    }

},
        {timestamps:true}

);

const User=mongoose.model("User",userSchema)
export default User;