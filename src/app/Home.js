'use client'
import { useState } from 'react';
 import AddTodo from './AddTodo';
 import TodoList from './TodoList';

const Home= (props) =>{
  const [todos, setTodos] = useState(props.todos);
  
  const addToList =async (todo) =>{
    try {
      const response = await fetch('/todos', {
        method: 'POST',
        body: JSON.stringify(todo),
      })
      const data = await response.json()
      console.log(data);
      
    } catch (error) {
      console.log(error);
    }
    const updatedTodos = [...todos, res.data];
    // console.log(updatedTodos);
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
export default Home;