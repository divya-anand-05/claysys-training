// Get references to stat elements
const totalQuestionsEl = document.getElementById("totalQuestions");
const totalUsersEl = document.getElementById("totalUsers");
const totalScoresEl = document.getElementById("totalScores");

// Load data from localStorage (or default empty)
let questionsData = JSON.parse(localStorage.getItem("questions")) || {};
let usersData = JSON.parse(localStorage.getItem("users")) || [];
let leaderboardData = JSON.parse(localStorage.getItem("leaderboard")) || [];

// Function to calculate and display totals
function updateDashboardStats() {
    // Total Questions
    const questions = JSON.parse(localStorage.getItem("questions")) || {};
    let totalQuestions = 0;
    for (let course in questions) {
        totalQuestions += questions[course].length;
    }
    document.getElementById("totalQuestions").textContent = totalQuestions;

    // Total Users
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const totalUsers = users.filter(u => u.role === "User").length;
    document.getElementById("totalUsers").textContent = totalUsers;

    // Total Leaderboard Entries
    const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    document.getElementById("totalScores").textContent = leaderboard.length;
}

//  function handles session termination
function logout() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (currentUser && currentUser.role === "User") {
        let loggedInCount = parseInt(localStorage.getItem("totalUsersLoggedIn")) || 0;
        loggedInCount = Math.max(loggedInCount - 1, 0);
        localStorage.setItem("totalUsersLoggedIn", loggedInCount);
    }

    // clear session data
    localStorage.removeItem("currentUser");
    window.location.href = "../login.html";
}


// Run on page load
updateDashboardStats();
