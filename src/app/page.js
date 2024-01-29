import Home from "./Home";

const fetchTodos =async ()=>{
  try{
    const response = await fetch('http://localhost:3000/todos');
    const data = await response.json();
    console.log(data);
    return data;
  }
  catch(err){
      console.log(err);
  }
}
async function HomePage(){
    const data = await fetchTodos();
    return <Home todos={data}/>
}
export default HomePage;
