const loginForm = document.getElementById('login-form') as HTMLFormElement;
declare var axios: any;
loginForm.addEventListener('submit',login);

async function login(e:any){
    e.preventDefault();
    const userDetails:{email:string, password:string} ={
        email:e.target.email.value,
        password: e.target.password.value
    };
    console.log(userDetails);
    try{
        const res = await axios.post('http://localhost:3000/user/login/',userDetails);
        console.log(res.data);
        localStorage.setItem('token',res.data.token);
        // window.location.replace('login.html')
        alert('logged in succesfully');
    }
    catch(err:any){
        const messageDisplay = document.querySelector('.message-alert') as HTMLParagraphElement;
        messageDisplay.innerText = err.response.data.message;
        messageDisplay.style.display='block';
        console.log(err);
    }
}


