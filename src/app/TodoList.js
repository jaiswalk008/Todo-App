'use client'

const TodoList = ({todos ,onMarkTodo ,onDeleteTodo}) =>{

    return (
        <>
            <div className="container d-flex flex-wrap " id="task-list">
                {todos.map((todo) =>{
                  
                    return (<div key ={todo._id} className="task">
                        <h4 style={{color:"black"}}>{todo.title}</h4>
                        <section>{todo.date}</section>
                        <p>{todo.description}</p>
                        {onMarkTodo && <div className="float-end">
                        <i onClick={() => onMarkTodo(todo._id)} className="bi bi-check"></i>
                        <i onClick={() => onDeleteTodo(todo._id)} className="bi me-2 bi-trash"></i>
                       
                        </div>}
                    </div>)
                })}
                
            </div>
        </>
    );
}
export default TodoList;