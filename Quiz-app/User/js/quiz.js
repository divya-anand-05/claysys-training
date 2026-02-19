
const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser) {
    alert("Please login first");
    window.location.href = "../login.html";
}


// Get stored values
const course = localStorage.getItem("course");
const username = currentUser.name;

// Load questions added by Admin
let questions = JSON.parse(localStorage.getItem("questions")) || {};
const adminQuestions = questions[course] || [];

if (adminQuestions.length === 0) {
    questions = Defaultquestions;  // Use your data.js defaults
} else {
    questions = { [course]: adminQuestions };  // Keep admin structure
}

// Safety check (uncommented)
// if (!questions[course] || questions[course].length === 0) {
//     alert("No questions available for this course yet!");
//     window.location.href = "index.html";
//     return;
// }

// Header display
document.getElementById("courseName").textContent = course;
document.getElementById("userName").textContent = username;

// State variables
let currentIndex = 0;
let score = 0;
let selectedAnswer = "";

// Elements
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");

// prevent blank quiz
<<<<<<< HEAD
// if (!questions[course] || questions[course].length === 0) {
//     alert("No questions available for this course yet!");
//     window.location.href = "index.html";
// }
=======
 if (!questions[course] || questions[course].length === 0) {
    alert("No questions available for this course yet!");
    window.location.href = "index.html";
 }
>>>>>>> 9cc9f593d90c54ac5133e49388cfbacc05a6ce51


// progress bar
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");

function updateProgress(currentIndex, totalQuestions) {
    const percentage = ((currentIndex + 1) / totalQuestions) * 100;  
    progressBar.style.width = percentage + "%";
    progressText.textContent = `Question ${currentIndex + 1} of ${totalQuestions}`;
}

document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        const nextBtn = document.getElementById("nextBtn");

        if (nextBtn && !nextBtn.disabled) {
            nextBtn.click();
        }
    }
});

let currentOptionIndex = -1;

document.addEventListener("keydown", (e) => {
    const options = document.querySelectorAll(".option-btn");
    if (!options.length) return;

    // DOWN ARROW
    if (e.key === "ArrowDown") {
        currentOptionIndex =
            (currentOptionIndex + 1) % options.length;   //3+1 % 4 ---> 0
        highlightOption(options);
    }

    // UP ARROW
    if (e.key === "ArrowUp") {
        currentOptionIndex =
            (currentOptionIndex - 1 + options.length) % options.length;  //(3 - 1 + 4) % 4
        highlightOption(options);
    }

    // ENTER = Select option
    if (e.key === "Enter" && currentOptionIndex >= 0) {
        options[currentOptionIndex].click();
    }
});

function highlightOption(options) {
    options.forEach(opt => opt.classList.remove("selected"));
    options.forEach(opt => opt.setAttribute("aria-checked", "false"));
    options[currentOptionIndex].classList.add("selected");
    options[currentOptionIndex].focus();
    options[currentOptionIndex].setAttribute("aria-checked", "true");

}



//timer logic
let timeLeft =15;
let timeInterval;

const timeEl = document.getElementById("time");

function startTimer(){
    clearInterval(timeInterval);
    timeLeft = 15;
    timeEl.textContent =timeLeft;

    timeInterval = setInterval(()=>{
        timeLeft--;
        timeEl.textContent =timeLeft;

        if(timeLeft === 0){
            clearInterval(timeInterval);
            
              // show "Time's up"
    const msg = document.getElementById("timeUpMsg");
    msg.style.display = "block";

    setTimeout(() => {
        msg.style.display = "none";
   
            selectedAnswer="";
            currentIndex++;   //move to next Ques

            if(currentIndex < questions[course].length){
                loadQuestion();
            }
            else{
                localStorage.setItem("score",score);
                localStorage.setItem("total",questions[course].length);

                // save leaderboard
                const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

leaderboard.push({
    id:Date.now(),
    name: username,
    course: course,
    score: score,
    total: questions[course].length,
    date: new Date().toLocaleDateString()
});

localStorage.setItem("leaderboard", JSON.stringify(leaderboard));

                window.location.href = "result.html";
            }
        },1000);
        }
    },1000);
}

function loadQuestion(){
    currentOptionIndex = -1; //fresh selection for each questions

    const currentQuestion = questions[course][currentIndex];

    // if (!currentQuestion || !currentQuestion.question) {
    //     alert("Question data corrupted. Please re-add questions.");
    //     window.location.href = "index.html";
    //     return;
    // }

    //clear old options and create new 
    questionEl.textContent = currentQuestion.question;
    nextBtn.disabled = true;
    updateProgress(currentIndex, questions[course].length);

    optionsEl.innerHTML = "";


    currentQuestion.options.forEach(option => {
        const btn = document.createElement("button");
        btn.textContent = option;
        btn.classList.add("option-btn");
         btn.setAttribute("role", "radio");
        btn.setAttribute("aria-checked", "false");
        btn.tabIndex = 0;

        btn.onclick = () => {
            document
                .querySelectorAll(".option-btn")
                .forEach(b =>{
                     b.classList.remove("selected");
                     b.setAttribute("aria-checked", "false");
        });

            btn.classList.add("selected");
            btn.setAttribute("aria-checked", "true");
            selectedAnswer = option.trim();    //save answer
            nextBtn.disabled = false;
        };

        optionsEl.appendChild(btn);
    });

    startTimer();
}




//user clicks Next -> ans locked
nextBtn.onclick = () => {
    if (!selectedAnswer) return;

    const correctAnswer = questions[course][currentIndex].answer.trim();
    const optionButtons = document.querySelectorAll(".option-btn");

    optionButtons.forEach(btn => {
        btn.classList.add("disabled");

        if (btn.textContent === correctAnswer) {
            btn.classList.add("correct");
        }

        if (btn.textContent === selectedAnswer && selectedAnswer !== correctAnswer) {
            btn.classList.add("wrong");
        }
    });

    if (selectedAnswer === correctAnswer) {
        score++;
    }

    setTimeout(() => {
        selectedAnswer = "";
        currentIndex++;

        if (currentIndex < questions[course].length) {
            loadQuestion();
            startTimer();
        } else {

             const totalQuestions = questions[course].length;
            localStorage.setItem("score", score);
            localStorage.setItem("total", totalQuestions);

            // save recent quiz

const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if(currentUser){
    const key = `recentQuizzes_${currentUser.email}`;

    //previous quiz history
    const recentQuizzes =
        JSON.parse(localStorage.getItem(key)) || [];

     recentQuizzes.unshift({
        name:currentUser,
        course:course,
        score:score,
        total: totalQuestions,
        date:new Date().toLocaleDateString()
     });
     
     //keep only last 5 quizzes

     if(recentQuizzes.length>5){
        recentQuizzes.pop();
     }
     localStorage.setItem(key, JSON.stringify(recentQuizzes));
}


            window.location.href = "result.html";
        }
    }, 1000);
};




loadQuestion();

