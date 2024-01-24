import AddTodo from "@/components/AddTodo";
import { useState } from "react";
import TodoList from "@/components/TodoList";

const HomePage= () =>{
  const [todos, setTodos] = useState([]);
  const addToList = (todo) =>{
    const updatedTodos = [...todos, todo];
    console.log(updatedTodos);
    setTodos(updatedTodos);
  }
 
  return (
    <>
      <AddTodo onSubmitHandler = {addToList}/>
      <div className="d-flex justify-content-center fw-bold fs-3">Tasks </div><hr/>
      <TodoList todos={todos}/>
    </>
  )
}
export default HomePage;