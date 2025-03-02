import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const app=express();

//connect to mongodb
mongoose.connect(process.env.MONGO).then(() => console.log("Connected to MongoDB")).catch(err => console.log("MongoDB Connection Error:", err));

app.listen(3005,()=>{
    console.log('server is running on port 3005');
})