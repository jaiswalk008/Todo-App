import { useRef } from "react";

const AddTodo = ({onSubmitHandler}) =>{
    
  const titleRef = useRef('');
  const dateRef = useRef('');
  const descriptionRef = useRef('');
  const formSubmitHandler = (e) =>{
    e.preventDefault();
    const title = titleRef.current.value
    const date = dateRef.current.value
    const description = descriptionRef.current.value
    const todo = {title,date,description};
    onSubmitHandler(todo);
  }

    return (
        <div className="m-4 d-flex justify-content-center">
            <button type="button" id="open-modal" className="btn w-50 btn-dark" data-bs-toggle="modal" data-bs-target="#new-task">
                Create new task <i className="bi bi-plus-square"></i>
            </button>
        <div className="modal fade" id="new-task" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Add New Task</h5>
                  </div>
                  <form onSubmit={formSubmitHandler}>
                      <div className="modal-body">
                        <label htmlFor="title" className="form-label">Task Title</label>
                        <input type="text" ref={titleRef} name="title" id="title" className="form-control" required/>
                        <label htmlFor="date" className="form-label mt-2 ">Due Date</label> 
                        <input type="date" ref={dateRef} name="date" id="date" className="form-control" placeholder="dd-mon-year" required  />
                        <label htmlFor="info" className="form-label mt-2">Description</label>
                        <textarea ref={descriptionRef} name="info" id="info" cols="30" rows="5" className="form-control"></textarea>

                      </div>
                      <div className="modal-footer">
                        <button type="button" id="close" className="btn btn-dark" data-bs-dismiss="modal">Close</button>
                        <button type="submit" id="save" onClick={() => document.getElementById('close').click()} className="btn">Save</button>
                      </div>
                  </form>
                  
                </div>
            </div>
        </div>
    </div>
    )
}
export default AddTodo;