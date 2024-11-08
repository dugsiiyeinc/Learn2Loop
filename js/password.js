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

