const signupForm = document.getElementById('signup-form') as HTMLFormElement;
declare var axios: any;
signupForm.addEventListener('submit',signup);

async function signup(e:any){
    e.preventDefault();
    const userDetails ={
        name:e.target.name.value,
        email:e.target.email.value,
        password: e.target.password.value
    };
    // console.log(userDetails);
    try{
        const res = await axios.post('http://localhost:3000/user/signup/',userDetails);
        console.log(res.data);
        window.location.replace('login.html');
    }
    catch(err:any){
        const messageDisplay = document.querySelector('.message-alert') as HTMLParagraphElement;
        messageDisplay.innerText = err.response.data.message;
        messageDisplay.style.display='block';
        console.log(err);
    }
}


