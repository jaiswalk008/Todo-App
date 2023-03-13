const form =document.getElementById('my-form');
const add = document.getElementById('save');
let task_counter=0;
let taskList=[]
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
        taskList.push(newTask);
        //adding task in local storage
        localStorage.setItem(title_text.value, JSON.stringify(newTask))

        //resetting form values
        form.reset()
        document.getElementById('close').click();
        showTask();
        
    }
}

if(localStorage.length>0) showTask();
function showTask(){
    console.log(taskList);
    let tasks=[];
    document.getElementById('task-list').style.backgroundColor ='rgb(115, 92, 168)';
    console.log(task_counter + ' '+localStorage.length);
    for(let i=0;i<localStorage.length;i++){

        let obj =JSON.parse(localStorage.getItem(localStorage.key(i)));
        tasks.push(obj);
      //  task_counter++;
    }
    console.log(tasks);
    
    for(let i=task_counter;i<localStorage.length;i++){
        task_counter++; 
        console.log(i+' '+task_counter + ' '+localStorage.length)
        let obj =JSON.parse(localStorage.getItem(localStorage.key(i)));
        let task_title =obj.taskTitle;
        //adding title
        let title = document.createElement('h4');
        title.appendChild(document.createTextNode(task_title));

        let task_date = obj.taskDate;
         //adding date
         let date = document.createElement('span');
         let mL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
         let d=new Date(task_date);
         var NoTimeDate = d.getDate()+'-'+mL[(d.getMonth())]+' '+d.getFullYear(); 
    
         date.appendChild(document.createTextNode(NoTimeDate));
         date.appendChild(document.createElement('br'))

         let task_description =obj.taskDescription;
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