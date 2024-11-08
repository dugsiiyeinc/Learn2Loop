 // Password Hide And Show Logic

 let passwordInput = document.querySelector("#password-input input");

 let passwordBtn = document.querySelector("#password-input i");

 passwordBtn.addEventListener("click",function(e)
 {
     if(passwordInput.type == "password")
     {
        passwordBtn.classList.replace("fa-eye","fa-eye-slash");
        passwordInput.type ="text";
     }
     else if(passwordInput.type == "text")
     {
        passwordBtn.classList.replace("fa-eye-slash","fa-eye");
        passwordInput.type ="password";
     }
 });


//  Login Request
let loginForm = document.querySelector(".loginForm");

loginForm.addEventListener("submit",async(e)=>
{
e.preventDefault();
document.querySelector("#loginBtn").innerHTML="<img width='16px' src='images/load.gif' alt='search...'>";
let formData = new FormData(loginForm);
formData.append('action','login');
// Api
let api = "https://xirfadeeye.com/apis/api.php";
let body =
{
method :"POST",
body: formData,
dataType:"json",
contentType:false,
processData:false
};

try
{
let request = await fetch(api,body);
let response = await request.json();
setTimeout(()=>{
if(response.status=="success")
{
    document.querySelector("#loginBtn").innerHTML="Send Me Back To My Account";
    Swal.fire({
        title: "Success",
        icon: "success",
        text: response.message,
        timer: 1000,  // Set a 1-second timer
        showConfirmButton: false
    }).then(() => {
        // Redirect to index.html after the alert closes
        window.location.href = "quiz.html";
    });
    localStorage.setItem("status",true);
    localStorage.setItem("eduType",response.eduType);
}
else if(response.status=="error")
{
    document.querySelector("#loginBtn").innerHTML="Send Me Back To My Account";
    $.notify( response.message,"error");
}
},500);
}
catch(error)
{
    console.error(error);
}

})