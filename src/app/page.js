'use client'
import AddTodo from "@/components/AddTodo";
import { useState } from "react";
import TodoList from "@/components/TodoList";

const Home= () =>{
  const [todos, setTodos] = useState([]);
  const addToList =async (todo) =>{
    // console.log(updatedTodos);
    console.log(todo);
    // try {
    //   const res = await axios.post('http:localhost:3000/todos',todo);
    //   console.log(res.data);
      
      
    // } catch (error) {
    //   console.log(error);
    // }
    const updatedTodos = [...todos, todo];

    setTodos(updatedTodos);
  }
  console.log('hello')
  return (
    <>
      <AddTodo onSubmitHandler = {addToList}/>
      <div className="d-flex justify-content-center fw-bold fs-3">Tasks </div><hr/>
      <TodoList todos={todos}/>
    </>
  )
}
export default Home;