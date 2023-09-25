const form =document.getElementById('my-form') as HTMLFormElement;
const add = document.getElementById('save');
declare var axios:any;
const token = localStorage.getItem('token');
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
    const title_text=document.getElementById('title') as HTMLInputElement;
    const date = document.getElementById('date') as HTMLInputElement;
    const taskDescription = document.getElementById('info') as HTMLTextAreaElement;
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
            console.log(res.data);
        } catch (error) {
            
        }
        //resetting form values
        form.reset()
        document.getElementById('close').click();
        console.log(newTask)
        showTask(newTask);
    }
}

function showTask(taskDetails:any){
    const div = document.createElement('div');
    let container= document.getElementById('task-list') as HTMLDivElement;
        
    div.className ='task';
    div.innerHTML 
    let task_date = taskDetails.date;
         //adding date
    const date = document.createElement('span');
    const mL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const d=new Date(task_date);
    const getDate = d.getDate()+'-'+mL[(d.getMonth())]+' '+d.getFullYear();
    div.innerHTML = `<h4>${taskDetails.title}</h4>${getDate}<br><span id="desc">${taskDetails.description}</span>
    <div class="div-icon"><button class="btn btn-sm  m-1" onClick id="edit"><i class="bi bi-pencil-square"></i></button>
    <button id="delete" class="btn btn-sm m1"><i class="bi bi-trash"></i></button></div>`
    container.appendChild(div);
}
window.addEventListener('DOMContentLoaded',async () =>{
    try {
        const res = await axios.get('http://localhost:3000/getTodos', {
            headers:{Authorization:token}
        });
        res.data.forEach((element:any) => {
            console.log(element);
            showTask(element);
        });
    } catch (error) {
        console.log(error);
    }
})