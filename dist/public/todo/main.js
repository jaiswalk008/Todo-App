"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const form = document.getElementById('my-form');
const add = document.getElementById('save');
const title_text = document.getElementById('title');
const date = document.getElementById('date');
const taskDescription = document.getElementById('info');
const token = localStorage.getItem('token');
const container = document.getElementById('task-list');
function showDateError() {
    let datemsg = document.getElementById('date-msg');
    datemsg.className = 'error';
    let errorMsg = 'Please choose a date!';
    datemsg.innerHTML = errorMsg;
    setTimeout(function () {
        datemsg.innerHTML = '';
    }, 3000);
}
form.addEventListener('submit', addTask);
function addTask(e) {
    return __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        //form validation
        if (title_text.value === '') {
            let titlemsg = document.getElementById('title-msg');
            titlemsg.className = 'error';
            let errorMsg = 'Please enter the task title!';
            titlemsg.innerHTML = errorMsg;
            setTimeout(function () {
                titlemsg.innerHTML = '';
            }, 3000);
            if (date.value === '')
                showDateError();
        }
        else if (date.value === '')
            showDateError();
        else {
            //adding task details   
            let newTask = {
                title: title_text.value,
                date: date.value,
                description: taskDescription.value
            };
            try {
                const res = yield axios.post('http://localhost:3000/addTodo/', newTask, {
                    headers: { Authorization: token }
                });
                showTask(res.data);
                //resetting form values
                form.reset();
                document.getElementById('close').click();
            }
            catch (error) {
            }
        }
    });
}
function showTask(taskDetails) {
    const div = document.createElement('div');
    const id = taskDetails._id;
    // console.log(id);
    div.className = 'task ' + id;
    div.innerHTML;
    const task_date = taskDetails.date;
    //adding date
    const date = document.createElement('span');
    const mL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const d = new Date(task_date);
    const getDate = d.getDate() + '-' + mL[(d.getMonth())] + ' ' + d.getFullYear();
    div.innerHTML = `<h4>${taskDetails.title}</h4>${getDate}<br><span id="desc">${taskDetails.description}</span>
    <div class="div-icon"><button id="${id}" onclick="markTodo('${id}')" class="btn btn-sm m1"><i class="bi bi-check"></i></button><button class="btn btn-sm  m-1" onclick="editTodo('${id}')" id="${id}"><i class="bi bi-pencil-square"></i></button>
    <button id="${id}" onclick="deleteTodo('${id}')" class="btn btn-sm m1"><i class="bi bi-trash"></i></button></div>`;
    container.appendChild(div);
    if (taskDetails.completed == true) {
        const titleElement = div.firstElementChild;
        titleElement.style.textDecoration = 'line-through';
        const buttonDiv = div.children.item(3);
        buttonDiv.style.display = "none";
    }
}
window.addEventListener('DOMContentLoaded', () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield axios.get('http://localhost:3000/getTodos', {
            headers: { Authorization: token }
        });
        res.data.forEach((element) => {
            // console.log(element);
            showTask(element);
        });
    }
    catch (error) {
        console.log(error);
    }
}));
function editTodo(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const openModal = document.getElementById('open-modal');
        openModal.click();
        const taskDiv = document.getElementsByClassName('' + id)[0];
        title_text.value = taskDiv.firstElementChild.innerHTML;
        console.log(title_text.value);
        taskDescription.value = taskDiv.children.item(2).innerHTML;
        deleteTodo(id);
    });
}
function deleteTodo(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const taskDiv = document.getElementsByClassName('' + id)[0];
        try {
            const res = yield axios.delete('http://localhost:3000/delete?id=' + id);
            container.removeChild(taskDiv);
            // console.log('removed todo')
        }
        catch (err) {
            console.log(err);
        }
    });
}
function markTodo(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const taskDiv = document.getElementsByClassName('' + id)[0];
        try {
            const res = yield axios.post('http://localhost:3000/update?id=' + id);
            const titleElement = taskDiv.firstElementChild;
            titleElement.style.textDecoration = 'line-through';
            const div = taskDiv.children.item(3);
            div.style.display = "none";
        }
        catch (err) {
            console.log(err);
        }
    });
}
