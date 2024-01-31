'use client'
import { useState, useCallback} from 'react';
 import AddTodo from './AddTodo';
 import TodoList from './TodoList';

const Home= (props) =>{
  const [todos, setTodos] = useState(props.todos);
  console.log(props.todos)

  const filterTodos = useCallback((id)=>{
    const newTodos = todos.filter(todo => todo._id!==id)
        setTodos(newTodos);
  },[todos])

  const addToList =async (todo) =>{
    try {
      const response = await fetch('/todos', {
        method: 'POST',
        body: JSON.stringify(todo),
      })
      const data = await response.json()
      // console.log(data);
      const updatedTodos = [...todos, data];
      setTodos(updatedTodos);
      
    } catch (error) {
      console.log(error);
    }
  }
  const markTodoAsCompleted = useCallback(async (id)=>{
    try{
        await fetch('/todos?id='+id,{
            method:"PATCH",
        })
        filterTodos(id);
    }
    catch(err){
        console.log(err);
    }
  },[filterTodos])

  const deleteTodos = useCallback(async (id) =>{
    try {
      await fetch('/todos?id='+id,{
        method:'DELETE',
      })
      filterTodos(id);
    } catch (error) {
      console.log(error);
    }
  },[filterTodos])
  return (
    <>
      <AddTodo onSubmitHandler = {addToList}/>
      <div className="d-flex justify-content-center fw-bold fs-3">Tasks </div><hr/>
      <TodoList onDeleteTodo={deleteTodos} onMarkTodo={markTodoAsCompleted} todos={todos}/>
    </>
  )
}
export default Home;