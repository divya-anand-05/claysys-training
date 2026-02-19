let selectedCourse = "";    //current selected course
let questions = JSON.parse(localStorage.getItem("questions")) || {};


function selectCourse(course) {
  selectedCourse = course;
  document.getElementById("selectedCourseTitle").textContent =
   course? `Adding questions for: ${course}`:"";

  renderQuestions();
}

//func handles both adding and editing ques
function addQuestion() {
     if (!selectedCourse) {
    alert("Please select a language first");
    return;
  }
    const questionText = document.getElementById("question").value.trim();
    const options = [
         document.getElementById("opt1").value,
        document.getElementById("opt2").value,
        document.getElementById("opt3").value,
        document.getElementById("opt4").value
    ];
    const answer = document.getElementById("answer").value.trim();

    // Validation (IMPORTANT)
    if (!selectedCourse || !questionText || options.some(o => !o) || !answer) {
        alert("All fields required");
        return;
    }
 if (!questions[selectedCourse]) questions[selectedCourse] = [];

    if (editIndex !== null) {
        // Update existing question
        questions[selectedCourse][editIndex] = {
            question: questionText,
            options,
            answer
        };
        editIndex = null; // reset edit mode
        document.querySelector("section button").textContent = "Add Question";
        alert("Question updated successfully");
    } else {
        // Add new question
        questions[selectedCourse].push({
            question: questionText,
            options,
            answer
        });
        alert("Question added successfully");
    }

    // Clear input fields
    document.getElementById("question").value = "";
    document.getElementById("opt1").value = "";
    document.getElementById("opt2").value = "";
    document.getElementById("opt3").value = "";
    document.getElementById("opt4").value = "";
    document.getElementById("answer").value = "";

    localStorage.setItem("questions", JSON.stringify(questions));
    renderQuestions();
    
}

// display questions
function renderQuestions() {
    const list = document.getElementById("questionList");
    list.innerHTML = "";

    if (!selectedCourse || !questions[selectedCourse]) return;

    const heading = document.createElement("h3");
    heading.textContent = `Existing ${selectedCourse} Questions`;
    list.appendChild(heading);
    
        questions[selectedCourse].forEach((q, i) => {
            const li = document.createElement("li");
            const editingClass = (editIndex === i) ? "editing" : "";
            li.className = editingClass;
            li.innerHTML = `
                
                <span class="question-text"><b>${i+1}:</b> ${q.question}</span>
                <div>
                <button class="edit" onclick="editQuestion('${selectedCourse}', ${i})">Edit
                </button>
                <button  class="delete" onclick="deleteQuestion('${selectedCourse}', ${i})">
                Delete</button>
                </div>
            `;
            list.appendChild(li);
        });
}

function deleteQuestion(course, index) {
    questions[course].splice(index, 1);
    localStorage.setItem("questions", JSON.stringify(questions));
    renderQuestions();
}

let editIndex = null; // track which question is being edited

function editQuestion(course, index) {
    const q = questions[course][index];
    document.getElementById("question").value = q.question;
    document.getElementById("opt1").value = q.options[0];
    document.getElementById("opt2").value = q.options[1];
    document.getElementById("opt3").value = q.options[2];
    document.getElementById("opt4").value = q.options[3];
    document.getElementById("answer").value = q.answer;

    selectedCourse = course;
    editIndex = index; // mark the question we are editing
    document.getElementById("selectedCourseTitle").textContent =
        `Editing question for: ${course}`;

    document.querySelector("section button").textContent = "Update Question"; // change button text
}


renderQuestions();


function goBack() {
    window.location.href = "index.html"; // return to dashboard
}

// keyboard events


let currentFieldIndex = -1;   //no selection initially

const fields = [
    document.getElementById("question"),
    document.getElementById("opt1"),
    document.getElementById("opt2"),
    document.getElementById("opt3"),
    document.getElementById("opt4"),
    document.getElementById("answer")
];

document.addEventListener("keydown", (e) => {
    if (!fields.length) return;

    if (e.key === "ArrowDown") {
        e.preventDefault();
        currentFieldIndex =
            (currentFieldIndex + 1) % fields.length;      // 1+1 %4---> 1
        highlightField();
    }

    if (e.key === "ArrowUp") {
        e.preventDefault();
        currentFieldIndex =
            (currentFieldIndex - 1 + fields.length) % fields.length;  // 0-1+4 %4--->3
        highlightField();
    }

    // ENTER → Add / Update Question
    if (e.key === "Enter" && currentFieldIndex >= 0) {
        e.preventDefault();
        addQuestion(); // same function for add & update
    }
});

function highlightField() {
    fields[currentFieldIndex].focus();
}

