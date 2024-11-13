let loginForm = document.querySelector(".loginForm");
        loginForm.addEventListener("submit",(e)=>
        {
            e.preventDefault();
            let emailInput = loginForm.querySelector("#email");
            let passwordInput = loginForm.querySelector("#password");
            if(emailInput.value == "" && passwordInput.value == "")
            {
                $.notify("Please Enter Your Email And Password","error");
            }
            else if(emailInput.value == "")
            {
                $.notify("Please Enter Your Email","error");
            }
            else if(passwordInput.value == "")
            {
                $.notify("Please Enter Your Password","error");
            }
            else
            {
                if(emailInput.value.includes("@") && emailInput.value.includes("."))
            {
                localStorage.setItem("email", "taamir.mm@gmail.com");
                localStorage.setItem("password","123456789");
                if(localStorage.getItem("email")==emailInput.value)
                        {
                            if(localStorage.getItem("password")==passwordInput.value)
                            {
                               localStorage.removeItem("email"); 
                               localStorage.removeItem("password"); 
                               localStorage.setItem("adminSession","adminSession");
                               window.location.href="index.html";
                            }
                            else
                            {
                                $.notify(`invalid admin Password`,"error");
                            }
                        }
                        else
                        {
                            $.notify(`invalid admin email`,"error");
                        }
            }   
            else
            {
                $.notify("Please Add Your Email Address @example.com","error");
            }            
        }
        });

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
