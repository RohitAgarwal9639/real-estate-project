import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
dotenv.config();
const app=express();
app.use(express.json());

//connect to mongodb
mongoose.connect(process.env.MONGO).then(() => console.log("Connected to MongoDB")).catch(err => console.log("MongoDB Connection Error:", err));
app.use('/api/users',userRouter);
app.use('/api/auth',authRouter);
app.listen(3000,()=>{
    console.log('server is running on port 3000');
})
