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

// Form Submit And  Sendig The Token Into Api Function

let regForm = document.getElementById("RegisterForm");

regForm.addEventListener("submit", async (e)=>
    {
        e.preventDefault();

    //  Geting The Token
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    let formData = new FormData(regForm);
    formData.append('token',token);
    formData.append('action','checkToken');
    let api ="https://xirfadeeye.com/apis/api.php";
    let data =
    {
        method:'POST',
        body:formData,
        dataType:'json',
        contentType:false,
        proccessData:false
    };
    try
    {
        let Getresponse = await fetch(api,data);
        let response = await Getresponse.json();
        if(response.status == "success")
        {
            Swal.fire({
                title: "Success",
                icon: "success",
                text: response.message,
                // timer: 2000,  // Set a 1-second timer
                // showConfirmButton: false
            }).then(() => {
                // Redirect to index.html after the alert closes
                window.location.href = "login.html";
            });
        }
        else if(response.status == "error")
        {
            $.notify( response.message,"error");
            if(response.tokenStatus == "noToken")
            {
                Swal.fire({
                    title: "error",
                    icon: "error",
                    text: response.message,
                    timer: 2000,  // Set a 1-second timer
                    showConfirmButton: false
                }).then(() => {
                    // Redirect to index.html after the alert closes
                    window.location.href = "index.html";
                });
                
            }
        }
    }
    catch(error)
    {
        console.error(error);
    }
})