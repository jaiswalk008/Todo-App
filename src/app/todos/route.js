'use server'
import todo from "../models/todo";
import connectToDatabase from "../../../helpers/database";

export async function POST (req,res){
    try{
        await connectToDatabase();
        const newTodo = new todo({...req.body});
        console.log(newTodo);
        await newTodo.save();
        // console.log(todo);
       
        res.status(200).json(newTodo);
      }
      catch(err){
        console.log(err);
      }
}