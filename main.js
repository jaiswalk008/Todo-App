const form =document.getElementById('my-form');
const add = document.getElementById('save');
console.log(document.getElementById('title').innerText)
form.addEventListener('submit',addTask);
function addTask(e){
    e.preventDefault()
    let newDiv = document.createElement('div');
    newDiv.className='task';
    let title = document.createElement('h4');
    title.appendChild(document.createTextNode(document.getElementById('title').value));
   // console.log(document.getElementById('title').value)
    let date = document.createElement('span');
    let mL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let d=new Date(document.getElementById('date').value)
    var NoTimeDate = d.getDate()+'-'+mL[(d.getMonth())]+' '+d.getFullYear(); 
   // console.log(NoTimeDate)
    date.appendChild(document.createTextNode(NoTimeDate));
    date.appendChild(document.createElement('br'))
    let des = document.createElement('span');
    des.appendChild(document.createTextNode(document.getElementById('info').value));
    newDiv.appendChild(title);
    newDiv.appendChild(date);
    newDiv.appendChild(des);
    let container= document.getElementById('task-list');
    container.appendChild(newDiv);
    add.setAttribute('data-ds-toggle')


}