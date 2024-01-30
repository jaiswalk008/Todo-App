'use server'
import todo from "../models/todo";
import connectToDatabase from "../../../helpers/database";
import { NextResponse } from "next/server";

export async function POST (req){
    
    try{
        await connectToDatabase();
        const body = await req.json();
        
        const newTodo = new todo(body);
        // console.log(newTodo);
        await newTodo.save();
       
        /*
        can also use
        return Response.json(newTodo,{
            status:200,
            headers:{...}
        })
        */

        return NextResponse.json(newTodo)
      }
      catch(err){
        console.log(err);
      }
}
export async function GET(){
    try{
        await connectToDatabase();
        const todos = await todo.find();

        return NextResponse.json(todos);
    }
    catch(err){
        console.log(err)
    }
}
export async function PATCH(req,{params}){
   const searchParams =req.nextUrl.searchParams;
   const id = searchParams.get('id');
//    console.log(id)
   try{
    await connectToDatabase();
   
    await todo.findByIdAndUpdate(id,{completed:true});
    
    return NextResponse.json({completed:true});
   }
   catch(err){
    console.log(err);
   }
}