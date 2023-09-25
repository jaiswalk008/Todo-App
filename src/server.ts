import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import userRoutes from './Routes/user';
import todoRoutes from './Routes/todos';
import user from "./Models/user";
dotenv.config();
const server = express();
server.use(cors());
import path from 'path';
server.use(bodyParser.json());
server.use('/user', userRoutes);
server.use(todoRoutes)
server.use((req,res)=>{
    res.sendFile(path.join(__dirname,`/public${req.url}`));
})
async function startServer(){
    await mongoose.connect(process.env.MONGODB_SRV);
    
    server.listen(3000, () => console.log('server is running on 3000'))
}
startServer();