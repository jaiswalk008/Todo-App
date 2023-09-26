const form =document.getElementById('my-form') as HTMLFormElement;
const add = document.getElementById('save');
declare var axios:any;
const title_text=document.getElementById('title') as HTMLInputElement;
const date = document.getElementById('date') as HTMLInputElement;
const taskDescription = document.getElementById('info') as HTMLTextAreaElement;
const token = localStorage.getItem('token');
const container= document.getElementById('task-list') as HTMLDivElement;
interface Task{
    title:string,
    date:string,
    description:string
}
function showDateError(){
    let datemsg = document.getElementById('date-msg');
    datemsg.className='error';
    let errorMsg = 'Please choose a date!';
    datemsg.innerHTML = errorMsg;
    setTimeout(function(){
        datemsg.innerHTML = '';
    },3000);
}
form.addEventListener('submit',addTask);
async function addTask(e:any){
    e.preventDefault()
    
    //form validation
    if(title_text.value===''){
        let titlemsg = document.getElementById('title-msg');
        titlemsg.className='error';
        let errorMsg = 'Please enter the task title!';
        titlemsg.innerHTML = errorMsg;
        setTimeout(function(){
            titlemsg.innerHTML = '';
        },3000);
        if(date.value==='') showDateError();
    }
    
    else if(date.value==='') showDateError();

    else{
        
        //adding task details   
        let newTask:Task={
            title:title_text.value,
            date:date.value,
            description: taskDescription.value
        };
        
        try {
            const res = await axios.post('http://localhost:3000/addTodo/',newTask , {
                headers:{Authorization:token}
        
            })
            showTask(res.data);
            //resetting form values
            form.reset()
            document.getElementById('close').click();
            

        } catch (error) {
            
        }
        
       
    }
}

function showTask(taskDetails:any){
    const div = document.createElement('div');
    
    const id = taskDetails._id;
    // console.log(id);
    div.className ='task '+id;
    div.innerHTML 
    const task_date = taskDetails.date;
         //adding date
    const date = document.createElement('span');
    const mL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const d=new Date(task_date);
    const getDate = d.getDate()+'-'+mL[(d.getMonth())]+' '+d.getFullYear();
    div.innerHTML = `<h4>${taskDetails.title}</h4>${getDate}<br><span id="desc">${taskDetails.description}</span>
    <div class="div-icon"><button id="${id}" onclick="markTodo('${id}')" class="btn btn-sm m1"><i class="bi bi-check"></i></button><button class="btn btn-sm  m-1" onclick="editTodo('${id}')" id="${id}"><i class="bi bi-pencil-square"></i></button>
    <button id="${id}" onclick="deleteTodo('${id}')" class="btn btn-sm m1"><i class="bi bi-trash"></i></button></div>`
    container.appendChild(div);
    if(taskDetails.completed==true){
        const titleElement = div.firstElementChild as HTMLHeadingElement;
        titleElement.style.textDecoration='line-through';
        const buttonDiv= div.children.item(3) as HTMLDivElement
        buttonDiv.style.display ="none";
    }
}
window.addEventListener('DOMContentLoaded',async () =>{
    try {
        const res = await axios.get('http://localhost:3000/getTodos', {
            headers:{Authorization:token}
        });
        res.data.forEach((element:any) => {
            // console.log(element);
            showTask(element);
        });
    } catch (error) {
        console.log(error);
    }
})
async function editTodo(id:any){
    const openModal = document.getElementById('open-modal') as HTMLButtonElement;
    openModal.click();
    const taskDiv = document.getElementsByClassName(''+id)[0] as HTMLDivElement;
    title_text.value = taskDiv.firstElementChild.innerHTML;
    console.log(title_text.value);
    taskDescription.value = taskDiv.children.item(2).innerHTML;
    
    deleteTodo(id); 
}
async function deleteTodo(id:any){
    const taskDiv = document.getElementsByClassName(''+id)[0] as HTMLDivElement;
    
    try{
        const res = await axios.delete('http://localhost:3000/delete?id='+id);
        container.removeChild(taskDiv);
        // console.log('removed todo')
        
    }
    catch(err){
        console.log(err);
    }

}
async function markTodo(id:any){
    const taskDiv = document.getElementsByClassName(''+id)[0] as HTMLDivElement;
    try {
        const res = await axios.post('http://localhost:3000/update?id='+id);
        const titleElement = taskDiv.firstElementChild as HTMLHeadingElement;
        titleElement.style.textDecoration='line-through';
        const div= taskDiv.children.item(3) as HTMLDivElement
        div.style.display ="none";
    } catch (err) {
        console.log(err);
    }
}