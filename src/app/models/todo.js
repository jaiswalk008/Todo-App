import mongoose from "mongoose";
const Schema = mongoose.Schema;
const todoSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    date:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        default:"",
    },
    completed:{
        type:Boolean,
        default:false,
    }

})
export default mongoose.models.Todo || mongoose.model('Todo',todoSchema);