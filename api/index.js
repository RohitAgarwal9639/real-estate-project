import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
dotenv.config();
const app=express();

//connect to mongodb
mongoose.connect(process.env.MONGO).then(() => console.log("Connected to MongoDB")).catch(err => console.log("MongoDB Connection Error:", err));
app.use('/api/users',userRouter);
app.listen(3000,()=>{
    console.log('server is running on port 3000');
})
