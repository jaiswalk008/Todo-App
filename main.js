const form =document.getElementById('my-form');
const add = document.getElementById('save');

form.addEventListener('submit',addTask);
function addTask(e){
    e.preventDefault()
    let title_text=document.getElementById('title');
    let date_value = document.getElementById('date').value;
    //form validation
    if(title_text.value.length <1){
        let titlemsg = document.getElementById('title-msg');
        titlemsg.className='error';
        let errorMsg = 'Please enter the task title!';
        titlemsg.innerHTML = errorMsg;
        setTimeout(function(){
            titlemsg.innerHTML = '';
        },2500);
        if(date_value===''){
            let datemsg = document.getElementById('date-msg');
            datemsg.className='error';
            let dateErrorMsg = 'Please choose a date!';
            datemsg.innerHTML = dateErrorMsg;
            setTimeout(function(){
                datemsg.innerHTML = '';
            },2500);
        }
        
        
    }
    
    else if(date_value===''){
        let datemsg = document.getElementById('date-msg');
        datemsg.className='error';
        let errorMsg = 'Please choose a date!';
        datemsg.innerHTML = errorMsg;
        setTimeout(function(){
            datemsg.innerHTML = '';
        },2500);
        
    }
    else{
        let newDiv = document.createElement('div');
        newDiv.className='task';
        
        //adding title
        let title = document.createElement('h4');
        title.appendChild(document.createTextNode(title_text.value));

        //adding date
        let date = document.createElement('span');
        let mL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        let d=new Date(document.getElementById('date').value)
        var NoTimeDate = d.getDate()+'-'+mL[(d.getMonth())]+' '+d.getFullYear(); 
   
        date.appendChild(document.createTextNode(NoTimeDate));
        date.appendChild(document.createElement('br'))

        //adding description

        let des = document.createElement('span');
        des.setAttribute('id','desc')
        des.appendChild(document.createTextNode(document.getElementById('info').value));
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

        //setting attribute to close the modal
        add.setAttribute('data-bs-dismiss','modal');
        add.click();

        //resetting form values
        //title field reset
        title_text.value=''; 
        //date reset   
        document.getElementById('date').value='';
        //description reset
        document.getElementById('info').value='';
    }


}