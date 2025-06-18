import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import cookieParser from 'cookie-parser';

dotenv.config();
const app=express();
app.use(express.json());
app.use(cookieParser());

//connect to mongodb
mongoose.connect(process.env.MONGO).then(() => console.log("Connected to MongoDB")).catch(err => console.log("MongoDB Connection Error:", err));
app.use('/api/users',userRouter);
app.use('/api/auth',authRouter);

//error handling middleware
app.use((err,req,res,next)=>{
    const statusCode=err.statusCode || 500;
    const message=err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
})


app.listen(3000,()=>{
    console.log('server is running on port 3000');
})
