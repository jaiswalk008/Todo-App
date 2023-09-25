import mongoose from "mongoose";
const Schema = mongoose.Schema;
import user from "./user";
import { ObjectId } from "mongodb";
const todoSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true,
    },
    description:{
        type:String
    },
    userId:{
        type:ObjectId,
        ref:user
    }
})
export default mongoose.model('Todo',todoSchema);