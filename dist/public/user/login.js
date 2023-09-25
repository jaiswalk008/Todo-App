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
const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', login);
function login(e) {
    return __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        const userDetails = {
            email: e.target.email.value,
            password: e.target.password.value
        };
        console.log(userDetails);
        try {
            const res = yield axios.post('http://localhost:3000/user/login/', userDetails);
            console.log(res.data);
            localStorage.setItem('token', res.data.token);
            window.location.replace('/todo/index.html');
            // alert('logged in succesfully');
        }
        catch (err) {
            const messageDisplay = document.querySelector('.message-alert');
            messageDisplay.innerText = err.response.data.message;
            messageDisplay.style.display = 'block';
            console.log(err);
        }
    });
}
