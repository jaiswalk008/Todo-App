import Home from "./Home";
import axios from "axios";
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
    const pendingTodos = data.filter(todo => !todo.completed);
    console.log(pendingTodos)
    return <Home todos={pendingTodos}/>
}
export default HomePage;
