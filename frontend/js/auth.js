const registerForm =
document.getElementById(
"registerForm"
);

if(registerForm){

registerForm.addEventListener(
"submit",
async(e)=>{

e.preventDefault();

await fetch(
"http://localhost:5000/users/register",
{
method:"POST",

headers:{
"Content-Type":
"application/json"
},

body:JSON.stringify({
name:
document.getElementById("name").value,

email:
document.getElementById("email").value,

password:
document.getElementById("password").value
})
});

alert("Registered");
});
}

const loginForm =
document.getElementById(
"loginForm"
);

if(loginForm){

loginForm.addEventListener(
"submit",
async(e)=>{

e.preventDefault();

const response =
await fetch(
"http://localhost:5000/users/login",
{
method:"POST",

headers:{
"Content-Type":
"application/json"
},

body:JSON.stringify({
email:
document.getElementById("email").value,

password:
document.getElementById("password").value
})
});

const data =
await response.json();

if(data.success){
alert("Login Success");
}
else{
alert("Invalid Credentials");
}
});
}