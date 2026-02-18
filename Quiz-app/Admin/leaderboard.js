function loadLeaderboard() {
    const selectedCourse = document.getElementById("courseSelect").value;
    const allData = JSON.parse(localStorage.getItem("leaderboard")) || [];
    const table = document.getElementById("leaderboardTable");
    const tableBody = document.querySelector("#leaderboardTable tbody");
    tableBody.innerHTML = "";

    if (!selectedCourse) {
        table.style.display = "none";
        return;
    }
    table.style.display ="table";

    // Filter by selected course
    const filtered = allData.filter(item => item.course === selectedCourse);

     if (filtered.length === 0) {
        // Show message row when no users attended
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td colspan="5" style="text-align:center; color:#555; font-style:italic;">
                No users have attended this quiz yet
            </td>
        `;
        tableBody.appendChild(tr);
        return;
    }

    // Sort descending by score
    filtered.sort((a,b) => b.score - a.score);

    filtered.forEach((item, index) => {
      
        const tr = document.createElement("tr");

         tr.dataset.id = item.id;
    tr.tabIndex = 0;
         

        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.name}</td>
            <td>${item.score}/${item.total}</td>
            <td>${item.date}</td>
            <td>
                <button onclick="editScore(${item.id})" class="edit">Edit</button>
                <button onclick="deleteScore(${item.id})" class="delete">Delete</button>
            </td>
        `;
        tableBody.appendChild(tr);
    });
}

function deleteScore(id) {
    if (!confirm("Are you sure you want to delete this user?")) return;

    let allData = JSON.parse(localStorage.getItem("leaderboard")) || [];

    const index = allData.findIndex(item => item.id === id);

    if (index === -1) {
        alert("Item not found");
        return;
    }

    // delete ONLY that row
    allData.splice(index, 1);

    localStorage.setItem("leaderboard", JSON.stringify(allData));
    loadLeaderboard();
}

function editScore(id) {
    let allData = JSON.parse(localStorage.getItem("leaderboard")) || [];
    const index= allData.findIndex(item => item.id === id);

    if(index === -1)return;

    const item =allData[index]; //it stores the selected user obj

    const newScore = prompt(
        `Edit score for ${item.name} (out of ${item.total})`,
        item.score
    );

    if (newScore === null) return; // cancel clicked

    const scoreNumber = Number(newScore);

    if (isNaN(scoreNumber) || scoreNumber <= 0 || scoreNumber > item.total) {
        alert("Invalid score!");
        return;
    }

    item.score = scoreNumber;
    allData[index] = item;

    localStorage.setItem("leaderboard", JSON.stringify(allData));
    loadLeaderboard();
}

let currentRowIndex = -1;

document.addEventListener("keydown", (e) => {
    const rows = document.querySelectorAll("#leaderboardTable tbody tr");
    if (rows.length === 0) return;

    // Remove previous selection
    function clearSelection() {
        rows.forEach(row => row.classList.remove("selected-row"));
    }

    // ⬇ Arrow Down
    if (e.key === "ArrowDown") {
        e.preventDefault();
        currentRowIndex = Math.min(currentRowIndex + 1, rows.length - 1);
    }

    // ⬆ Arrow Up
    if (e.key === "ArrowUp") {
        e.preventDefault();
        currentRowIndex = Math.max(currentRowIndex - 1, 0);
    }

    // Highlight selected row
    if (currentRowIndex >= 0) {
        clearSelection();
        rows[currentRowIndex].classList.add("selected-row");
        rows[currentRowIndex].focus();
    }

    // ENTER → Edit
    if (e.key === "Enter" && currentRowIndex >= 0) {
        const id = rows[currentRowIndex].dataset.id;
        editScore(Number(id));
    }

    // DELETE → Delete
    if ((e.key === "Delete" || e.key === "Backspace") && currentRowIndex >= 0) {
        const id = rows[currentRowIndex].dataset.id;
        deleteScore(Number(id));
        currentRowIndex = -1; // reset
    }
});


function goBack() {
    window.location.href = "index.html"; // return to dashboard
}
