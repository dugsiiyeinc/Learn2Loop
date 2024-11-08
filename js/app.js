window.onload = function() {
    localStorage.clear();
};

// Section One JS Code
let Next1 = document.querySelector("#Next1");
Next1.addEventListener("click", function (e) {
    let section1 = document.querySelector(".section1");
    section1.style.display = "none";

    let section2 = document.querySelector(".section2");
    section2.style.display = "flex";
    section2.style.left = "0px";
    section2.style.opacity = "1";

    localStorage.setItem("Section2", true);
    localStorage.removeItem("Section3");
});
let Next2 = document.querySelector("#Next2");

Next2.addEventListener("click", function (e) {
    let fullName = document.querySelector("#fullName").value;
    let email = document.querySelector("#email").value;
    let level = document.querySelector("#level:checked"); // Get the checked level

    // Validation: Check if fields are empty
    if (fullName === "" || email === "" || !level) {
        $.notify("All Fields Are Required!", "error");
    } else {
        // Move to the next section if all fields are valid
        let section2 = document.querySelector(".section2");
        section2.style.display = "none";
    
        let section3 = document.querySelector(".section3");
        section3.style.display = "flex";
        section3.style.left = "0px";
        section3.style.opacity = "1";
    
        localStorage.setItem("Section3", true);
        localStorage.removeItem("Section2");
    }
});


// Check active sections
let activeSection2 = localStorage.getItem("Section2") === "true";
let activeSection3 = localStorage.getItem("Section3") === "true";

if (activeSection2) {
    let section2 = document.querySelector(".section2");
    section2.style.display = "flex";
    section2.style.left = "0px";
    section2.style.opacity = "1";

    let section1 = document.querySelector(".section1");
    section1.style.display = "none";

    let section3 = document.querySelector(".section3");
    section3.style.display = "none";
} else if (activeSection3) {
    let section3 = document.querySelector(".section3");
    section3.style.display = "flex";
    section3.style.left = "0px";
    section3.style.opacity = "1";

    let section1 = document.querySelector(".section1");
    section1.style.display = "none";

    let section2 = document.querySelector(".section2");
    section2.style.display = "none";
}

// Now Request Time


// Form Submit
let registerForm = document.getElementById("RegisterForm");

registerForm.addEventListener("submit",async (e)=>
    {
            e.preventDefault();
            document.querySelector("#registerBtn").innerHTML="<img width='16px' src='images/load.gif' alt='search...'>";
            let formData = new FormData(registerForm);
            formData.append("action","Registration");
            formData.append("Registration","RegPass3344");
            // Api Request
            let registerApi = "https://xirfadeeye.com/apis/api.php";
            let options = 
            {
                method:"POST",
                body:formData,
                dataType:"json",
                processData:false,
                contentType:false
            };
            try
            {
                let Request = await fetch(registerApi,options);
                let response = await Request.json();
               setTimeout(()=>{
               if(response.status === "success")
                {
                    console.log(response.message);
                // Success Alert
                // $.notify(response.message, "success");
                document.querySelector("#lastRight").innerHTML=response.message;
                // Update Button Text
                document.querySelector("#registerBtn").innerHTML="Next";
            //    swal.fire({
            //     title:"Success",
            //     icon:"success",
            //     text:response.message,
            //     time:1000,
            //     comfirmButton:false
            //    });
                }
                else if(response.status == "error")
                {
                    console.log(response.message);
                                            // Danger Alert
                        $.notify( response.message,"error");
                             // Update Button Text
                document.querySelector("#registerBtn").innerHTML="Next";
                if(response.type="back_error")
                {
                    localStorage.removeItem("section2");
                    let section2 = document.querySelector(".section2");
                    section2.style.display = "flex";
                    section2.style.left = "0px";
                    section2.style.opacity = "1";
                    let section3 = document.querySelector(".section3");
                    section3.style.display = "none";
                    section3.style.left = "100px";
                    section3.style.opacity = "0";
                }
                        // swal.fire({
                        //     title:"Error",
                        //     icon:"Error",
                        //     text:response.message
                        //     // time:1000,
                        //     // comfirmButton:false
                        //    });
                }
            },500);
            }
            catch(error)
            {
                console.error(error);
            }
    });



   