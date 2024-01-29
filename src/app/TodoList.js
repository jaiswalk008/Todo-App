'use client'
const TodoList = ({todos}) =>{

    return (
        <>
            <div className="container d-flex flex-wrap " id="task-list">
                {todos.map((todo) =>{
                  
                    return (<div key ={todo._id} className="task">
                        <h4 style={{color:"black"}}>{todo.title}</h4>
                        <section>{todo.date}</section>
                        <p>{todo.description}</p>
                    </div>)
                })}
                
            </div>
        </>
    );
}
export default TodoList;