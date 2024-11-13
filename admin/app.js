let logOut=()=>
    {

        localStorage.removeItem("adminSession");
        window.location.reload();
    }
    window.onload=function()
    {
        let adminSession = localStorage.getItem('adminSession');
        if(!adminSession)
        {
            window.location.href ='adminlogin.html';
        }

    }
    const questionGrid = document.getElementById("questionGrid");
    const questionForm = document.getElementById("questionForm");
    const questionModal = document.getElementById("questionModal");
    const modalTitle = document.getElementById("modalTitle");

    let questions = JSON.parse(localStorage.getItem("questions")) || [];
    let editingIndex = -1;

    function openModal(isEdit = false, index = -1) {
        questionModal.classList.remove("hidden");
        questionModal.style.display="flex";
        modalTitle.innerText = isEdit ? "Edit Question" : "Add New Question";
        if (isEdit) {
            editingIndex = index;
            loadQuestionData(questions[index]);
        }
    }

    function closeModal() {
        questionModal.classList.add("hidden");
        questionModal.style.display="none";
        questionForm.reset();
        editingIndex = -1;
    }

    function saveQuestions() {
        localStorage.setItem("questions", JSON.stringify(questions));
        renderQuestions();
    }

    function renderQuestions() {
        questionGrid.innerHTML = "";
        questions.forEach((question, index) => {
            const questionCard = document.createElement("div");
            questionCard.classList.add("bg-[var(--Scolor)]", "p-4", "rounded-lg", "shadow-md", "text-[var(--Tcolor)]");

            questionCard.innerHTML = `
                <div class="flex justify-between items-center">
                    <span class="font-semibold">${question.type}</span>
                    <div>
                        <button onclick="editQuestion(${index})" class="text-blue-400 hover:text-blue-600 mr-2">✏️</button>
                        <button onclick="deleteQuestion(${index})" class="text-red-400 hover:text-red-600">&times;</button>
                    </div>
                </div>
                <div class="mt-2 mb-2 font-bold">${question.question}</div>
                <ul class="text-sm list-disc ml-4">
                    ${question.options.map((option, i) => `
                        <li${question.correctAnswer === i ? ' class="font-semibold text-green-400"' : ''}>${option}</li>
                    `).join('')}
                </ul>
            `;
            
            questionGrid.appendChild(questionCard);
        });
    }

    function loadQuestionData(question) {
        document.getElementById("questionText").value = question.question;
        document.getElementById("questionType").value = question.type;
        document.getElementById("option1").value = question.options[0] || "";
        document.getElementById("option2").value = question.options[1] || "";
        document.getElementById("option3").value = question.options[2] || "";
        document.getElementById("option4").value = question.options[3] || "";
        document.getElementById(`correct${question.correctAnswer + 1}`).checked = true;
    }

    questionForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const questionText = document.getElementById("questionText").value.trim();
        const questionType = document.getElementById("questionType").value;
        const options = [
            document.getElementById("option1").value.trim(),
            document.getElementById("option2").value.trim(),
            document.getElementById("option3").value.trim(),
            document.getElementById("option4").value.trim()
        ].filter(option => option);

        const correctAnswer = [1, 2, 3, 4].find(i => document.getElementById(`correct${i}`).checked) - 1;
        if (correctAnswer === undefined) {
            $.notify("Please mark a correct answer!", "error");
            return;
        }

        if (editingIndex === -1 && questions.some(q => q.question.toLowerCase() === questionText.toLowerCase())) {
            $.notify("This question already exists!", "error");
            return;
        }

        const questionData = { question: questionText, type: questionType, options, correctAnswer };
        if (editingIndex >= 0) {
            questions[editingIndex] = questionData;
            $.notify("Question updated!", "success");
        } else {
            questions.push(questionData);
            $.notify("Question added!", "success");
        }

        saveQuestions();
        closeModal();
    });

    function editQuestion(index) {
        openModal(true, index);
    }

    function deleteQuestion(index) {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                questions.splice(index, 1);
                saveQuestions();
                Swal.fire('Deleted!', 'Your question has been deleted.', 'success');
            }
        });
    }

    document.addEventListener("DOMContentLoaded", renderQuestions);
