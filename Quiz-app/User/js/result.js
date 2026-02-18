const score = localStorage.getItem("score");
const total = localStorage.getItem("total");
const username = localStorage.getItem("username");
const course = localStorage.getItem("course");

const percentage = Math.round((score/total)*100);

document.getElementById("summary").textContent =

`${username}, you scored ${score} out of ${total}.`;


const radius = 75;
const circumference = 2 * Math.PI * radius;

const circle = document.querySelector(".progress-ring-fill");
const progressSvg = document.querySelector(".progress-ring");
circle.style.strokeDasharray = circumference;

// core logic of progress ring
const offset =
    circumference - (percentage / 100) * circumference;

setTimeout(() => {
    circle.style.strokeDashoffset = offset;
    progressSvg.setAttribute("aria-valuenow", percentage);
}, 300);

document.getElementById("scorePercent").textContent = `${percentage}%`;


// save leadeerboard data
saveToLeaderboard();

function saveToLeaderboard() {
    let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

    leaderboard.push({
        id:Date.now(),
        name: username,
        course: course,
        score: Number(score),
        total: Number(total),
        date: new Date().toLocaleDateString()
    });

    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
}

document.getElementById("retryBtn").onclick = () =>{
    window.location.href = "quiz.html";
};

document.getElementById("homeBtn").onclick = () =>{
    window.location.href = "index.html";
};