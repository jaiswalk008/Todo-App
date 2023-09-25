import Todo from '../Models/todo';
// import User from '../Models/user';

export const addTodo = async (req:any,res:any)=>{
    const todoInfo = {...req.body};
    try{
        console.log(req.user._id);
        const newTodo = new Todo({...todoInfo,userId:req.user._id});
        console.log(newTodo);
        await newTodo.save();
        res.status(200).json(newTodo);
    }
    catch(err){
        console.log(err);
    }
}
export const getTodos = async (req:any,res:any) =>{
    try {
        // console.log(req.user._id);
        const todos =await  Todo.find({userId:req.user._id}).select('-userId');
        console.log(todos);
        res.status(201).json(todos);
    } catch (err) {
        console.log(err);
    }
}