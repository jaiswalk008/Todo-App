const form =document.getElementById('my-form');
const add = document.getElementById('save');
let task_counter=localStorage.length;
let tasks=[]
let ct=0;
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
function addTask(e){
    e.preventDefault()
    let title_text=document.getElementById('title');
    let date_value = document.getElementById('date').value;
    //form validation
    if(title_text.value===''){
        let titlemsg = document.getElementById('title-msg');
        titlemsg.className='error';
        let errorMsg = 'Please enter the task title!';
        titlemsg.innerHTML = errorMsg;
        setTimeout(function(){
            titlemsg.innerHTML = '';
        },3000);
        if(date_value==='') showDateError();
    }
    
    else if(date_value==='') showDateError();

    else{
        
        //adding task details   
        let newTask={
            taskTitle:title_text.value,
            taskDate:date_value,
            taskDescription: document.getElementById('info').value
        };
        
        //adding task in local storage
        localStorage.setItem(''+task_counter, JSON.stringify(newTask))
        task_counter++;
        //resetting form values
        form.reset()
        document.getElementById('close').click();
        showTask();
    }
}

if(localStorage.length) showTask();
function showTask(){
    document.getElementById('task-list').style.backgroundColor ='rgb(115, 92, 168)';
    //retrieving data from local storage
    for(let i=ct;i<localStorage.length;i++){
        let obj =(localStorage.getItem(i));
        tasks.push(obj);
        ct++;
        let objDetails = JSON.parse(tasks[i]);
        console.log(objDetails)
        //adding title
        let task_title =objDetails.taskTitle;

        
        let title = document.createElement('h4');
        title.appendChild(document.createTextNode(task_title));

        let task_date = objDetails.taskDate;
         //adding date
         let date = document.createElement('span');
         let mL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
         let d=new Date(task_date);
         var NoTimeDate = d.getDate()+'-'+mL[(d.getMonth())]+' '+d.getFullYear(); 
    
         date.appendChild(document.createTextNode(NoTimeDate));
         date.appendChild(document.createElement('br'))

         let task_description =objDetails.taskDescription;
         let des = document.createElement('span');
        des.setAttribute('id','desc')
        des.appendChild(document.createTextNode(task_description));
        let newDiv = document.createElement('div');
        newDiv.className='task';
        newDiv.appendChild(title);
        newDiv.appendChild(date);
        newDiv.appendChild(des);
        //inserting the div element in the task list container
        let container= document.getElementById('task-list');
        container.appendChild(newDiv);
        //new div for icons
        let iconDiv = document.createElement('div');
        iconDiv.className='div-icon';
        let editbtn = document.createElement('button');
        editbtn.setAttribute('id','edit');
        editbtn.className='btn-sm  m-1'
        let editIcon = document.createElement('i');
        editIcon.className='bi bi-pencil-square'
        editbtn.appendChild(editIcon)
        iconDiv.appendChild(editbtn);
       

        //delete button
        let deletebtn = document.createElement('button');
        deletebtn.setAttribute('id','delete');
        deletebtn.className='btn-sm  m-1'
        deletebtn.color='grey';
        let deleteIcon = document.createElement('i');
        deleteIcon.className='bi bi-trash';
        deletebtn.appendChild(deleteIcon);
        iconDiv.appendChild(deletebtn);
        newDiv.appendChild(iconDiv);
    }
}