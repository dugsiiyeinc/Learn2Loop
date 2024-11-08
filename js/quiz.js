// Logout
document.querySelector(".logout").addEventListener("click", function(e) {
    e.preventDefault();
    localStorage.clear(); 
    window.location.reload();
});

let Status=localStorage.getItem("status");
if(Status)
{

}
else
{
    window.location.href="login.html";
}

let questionType = localStorage.getItem("eduType");  // Change this to 'css', 'js', or 'php' to get questions of that type

const questionBank = {
    html: [
        { question: "What does HTML stand for?", options: ["HyperText Marking Language", "HyperText Markup Language", "Hyper Tool Markup Language", "Hyper Transfer Markup Language"], answer: 1 },
        { question: "Which HTML tag is used to define an internal style sheet?", options: ["<css>", "<style>", "<script>", "<stylesheet>"], answer: 1 },
        { question: "Which HTML element is used to display a large heading?", options: ["<heading>", "<h1>", "<head>", "<h6>"], answer: 1 },
        { question: "Which attribute specifies a unique identifier for an HTML element?", options: ["class", "id", "style", "src"], answer: 1 },
        { question: "What is the purpose of the alt attribute in an <img> tag?", options: ["To specify the image source", "To specify the image size", "To provide alternate text for the image", "To define a border for the image"], answer: 2 },
        { question: "Which HTML tag is used to create a hyperlink?", options: ["<a>", "<link>", "<href>", "<url>"], answer: 0 },
        { question: "Which HTML attribute is used to define inline styles?", options: ["font", "class", "styles", "style"], answer: 3 },
        { question: "What is the correct HTML element for inserting a line break?", options: ["<br>", "<lb>", "<break>", "<hr>"], answer: 0 },
        { question: "Which HTML element defines a paragraph?", options: ["<p>", "<pg>", "<paragraph>", "<text>"], answer: 0 },
        { question: "What is the purpose of the <head> element in HTML?", options: ["To contain page metadata", "To display page content", "To define the footer", "To add external links"], answer: 0 }
    ],
    css: [
        { question: "What does CSS stand for?", options: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"], answer: 1 },
        { question: "Which property is used to change the background color?", options: ["bgcolor", "color", "background-color", "bg-color"], answer: 2 },
        { question: "Which CSS property controls the text size?", options: ["font-style", "text-size", "font-size", "text-style"], answer: 2 },
        { question: "Which CSS property is used to change the font?", options: ["font-style", "font-family", "font-size", "font-weight"], answer: 1 },
        { question: "Which property is used to add spacing between elements?", options: ["border", "margin", "padding", "space"], answer: 1 },
        { question: "Which CSS selector targets a class?", options: [".classname", "#classname", "*classname", "&classname"], answer: 0 },
        { question: "Which CSS property is used to make text bold?", options: ["font-weight", "text-weight", "font-style", "bold"], answer: 0 },
        { question: "What is the correct syntax to select an ID in CSS?", options: [".idname", "#idname", "*idname", "&idname"], answer: 1 },
        { question: "Which CSS property is used to change text color?", options: ["text-color", "color", "font-color", "text-style"], answer: 1 },
        { question: "Which property is used to control the space inside a border?", options: ["padding", "margin", "border-width", "border-space"], answer: 0 }
    ],
    js: [
        { question: "What does 'var' declare in JavaScript?", options: ["Variable", "Constant", "Function", "Object"], answer: 0 },
        { question: "Which method is used to write to the console in JavaScript?", options: ["console.log", "console.write", "console.print", "console.display"], answer: 0 },
        { question: "Which symbol is used for comments in JavaScript?", options: ["//", "/*", "#", "--"], answer: 0 },
        { question: "How do you declare a function in JavaScript?", options: ["function myFunction()", "def myFunction()", "fn myFunction()", "declare myFunction()"], answer: 0 },
        { question: "What is used to iterate over arrays in JavaScript?", options: ["for loop", "while loop", "map", "all of the above"], answer: 3 },
        { question: "Which JavaScript keyword is used to define a constant?", options: ["let", "const", "var", "constant"], answer: 1 },
        { question: "Which operator is used for strict equality?", options: ["==", "!=", "===", "="], answer: 2 },
        { question: "How do you create an array in JavaScript?", options: ["array[]", "{}", "[]", "array()"], answer: 2 },
        { question: "Which function converts JSON to JavaScript object?", options: ["JSON.stringify", "JSON.parse", "parse()", "convertJSON"], answer: 1 },
        { question: "What does NaN mean?", options: ["Not a Number", "Not a Null", "Next Available Number", "Number and Null"], answer: 0 }
    ],
    php: [
        { question: "What does PHP stand for?", options: ["Personal Home Page", "PHP: Hypertext Preprocessor", "Preprocessor Home Page", "Private Home Page"], answer: 1 },
        { question: "Which symbol is used to start a variable in PHP?", options: ["$", "@", "%", "&"], answer: 0 },
        { question: "Which function is used to output text in PHP?", options: ["echo", "print", "output", "show"], answer: 0 },
        { question: "What is the correct syntax to start PHP code?", options: ["<?php", "<php>", "<?php?>", "<!php>"], answer: 0 },
        { question: "How do you include a file in PHP?", options: ["include()", "require()", "import()", "both include() and require()"], answer: 3 },
        { question: "Which function is used to get the length of a string in PHP?", options: ["strlen()", "count()", "length()", "strlength()"], answer: 0 },
        { question: "What is the default file extension for PHP files?", options: [".html", ".php", ".xml", ".txt"], answer: 1 },
        { question: "Which loop is used in PHP to execute a block of code a specified number of times?", options: ["for", "while", "foreach", "do-while"], answer: 0 },
        { question: "How do you comment a single line in PHP?", options: ["//", "/*", "#", "<!--"], answer: 0 },
        { question: "Which operator is used to concatenate strings in PHP?", options: [".", "+", "&", "="], answer: 0 }
    ]
};

let score = 0; // Track correct answers (1 point per correct answer)
let currentQuestion = 0;
let timer; // Timer variable
let timeLeft = 30; // Time for each question in seconds

function loadQuestion() {
    const questionSet = questionBank[questionType];
    if (currentQuestion < questionSet.length) {
        const q = questionSet[currentQuestion];
        document.getElementById("question-text").textContent = q.question;
        document.querySelectorAll(".option").forEach((btn, idx) => {
            btn.textContent = q.options[idx];
            btn.classList.remove("correct", "wrong");
        });

        // Start or reset the timer
        timeLeft = 30;
        document.getElementById("timer").innerHTML = `<i class="fas fa-clock"></i> ${timeLeft}s`;
        clearInterval(timer);
        timer = setInterval(updateTimer, 1000);
    }
}

function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        document.getElementById("timer").innerHTML = `<i class="fas fa-clock"></i> ${timeLeft}s`;
    } else {
        clearInterval(timer); // Stop the timer when it reaches 0
        nextQuestion(); // Go to the next question after time is up
    }
}

function checkAnswer(selected) {
    const questionSet = questionBank[questionType];
    const correctAnswer = questionSet[currentQuestion].answer;
    const buttons = document.querySelectorAll(".option");

    if (selected === correctAnswer) {
        buttons[selected].classList.add("correct");
        score += 1; // Add 1 point for correct answer
    } else {
        buttons[selected].classList.add("wrong");
        buttons[correctAnswer].classList.add("correct");
    }

    // Update the score display
    document.getElementById("score").textContent = `Score: ${score}/${questionSet.length}`;
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questionBank[questionType].length) {
        loadQuestion(); // Load the next question
    } else {
        clearInterval(timer); // Stop the timer at the end
       // Prompt the user to choose a language
let PromptText = prompt("Next Language? Write html, css, js, or php");

// Remove any previous 'eduType' value from localStorage
localStorage.removeItem("eduType");

// Validate the input to ensure it's one of the specified options
if (PromptText === "html" || PromptText === "css" || PromptText === "js" || PromptText === "php") {
    // Store the valid choice in localStorage
    localStorage.setItem("eduType", PromptText);
    console.log("Choice saved:", PromptText);
} else {
    // Inform the user that the input is invalid
    $.notify( response.message,"Invalid input. Please enter 'html', 'css', 'js', or 'php'.");

}

    }
}

// Event listener for option buttons
document.querySelectorAll(".option").forEach((btn, index) => {
    btn.addEventListener("click", () => {
        checkAnswer(index);
        setTimeout(nextQuestion, 1000); // Wait 1 second before moving to the next question
    });
});

// Load the first question when the page loads
loadQuestion();
