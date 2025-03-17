import mongoose from "mongoose";
const connectDB =async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Sucessfully connected to the mongoosedb");
        
    } catch (error) {
        console.error(`Error ${error.message}`);
        process.exit(1)
        
    }
}
export default connectDB