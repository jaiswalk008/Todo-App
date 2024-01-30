import TodoList from "../TodoList";


const fetchTodos =async ()=>{
    try{
      const response = await fetch('http://localhost:3000/todos',{ cache: 'no-store' });
      const data = await response.json();
      
     
      console.log(response);
      return  data;
    }
    catch(err){
        console.log(err);
    }
  }
async function HomePage(){
    const data = await fetchTodos();
    const completedTodos = data.filter(todo => todo.completed);
    console.log(completedTodos)
    return (
        <>
            <h1 className="text-center">Completed Todos</h1>
            <hr/>
            <TodoList todos={completedTodos}/>
        </>
    )
}
export default HomePage;