import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv"
import path from "path"

///Files
  import connectDB from "./config/db.js";
  import userRoutes from "./routes/userRoutes.js"
//
 dotenv.config()
 connectDB();


 const app=express()


 //middleware

 app.use(express.json())
 app.use(express.urlencoded({extended:true}))
 app.use(cookieParser())


 const PORT=process.env.PORT ||3000



 //Routes



app.use("/api/v1/users",userRoutes);
app.listen(PORT,()=>console.log(`Server is running on the port:${PORT}`));
 