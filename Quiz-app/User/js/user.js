
let selectedCourse = "";  //stores user selected course

const cards = document.querySelectorAll(".course-card");
const startBtn = document.getElementById("startBtn");
const error =  document.getElementById("error");

cards.forEach(card=>{
    card.addEventListener("click", ()=>{

        //deselect
         if (card.classList.contains("selected")) {
            card.classList.remove("selected");
            card.setAttribute("aria-pressed", "false");
            selectedCourse = "";
            return;
        }
        cards.forEach(c=> {
            c.classList.remove("selected");
            c.setAttribute("aria-pressed", "false");
    });
        card.classList.add("selected");
        card.setAttribute("aria-pressed", "true");
        selectedCourse = card.dataset.course;
    });
});

startBtn.addEventListener("click",()=>{
    const username = document.getElementById("username").value.trim();

    // validation
    if(!username){
        error.textContent = "Please enter your name";
        return;
    }
    else if(!selectedCourse){
        error.textContent = "Please select a course";
        return;
    }

localStorage.setItem("username", username);
localStorage.setItem("course", selectedCourse);


    window.location.href = "quiz.html";
});

// keyboard event
document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        const startBtn = document.getElementById("startBtn");

        if (startBtn && !startBtn.disabled) {
            startBtn.click();
        }
    }
});

// recent quiz history display
 const currentUser =JSON.parse(localStorage.getItem("currentUser"));
const recentQuizBody = document.getElementById("recentQuizBody");

if(!currentUser){
    recentQuizBody.innerHTML = `
       <tr><td colspan="4">Login required</td></tr>`;
}
else{
    const key = `recentQuizzes_${currentUser.email}`;
    const recentQuizzes = JSON.parse(localStorage.getItem(key)) || [];

    if(recentQuizzes.length === 0){
        recentQuizBody.innerHTML = `
        <tr><td colspan="4">No recent quizzes</td></tr>`;
    }
    else{
        recentQuizzes.forEach(q=>{
            const row = document.createElement("tr");

            row.innerHTML=`
            <td>${currentUser.name}</td>
            <td>${q.course}</td>
            <td>${q.score}/${q.total}</td>
            <td>${q.date}</td>`;

            recentQuizBody.appendChild(row);
        })
    }
}

function logout() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (currentUser && currentUser.role === "User") {
        let loggedInCount = parseInt(localStorage.getItem("totalUsersLoggedIn")) || 0;
        loggedInCount = Math.max(loggedInCount - 1, 0);   //prevents negative nums
        localStorage.setItem("totalUsersLoggedIn", loggedInCount);
    }

    localStorage.removeItem("currentUser");
    window.location.href = "../login.html";
}
