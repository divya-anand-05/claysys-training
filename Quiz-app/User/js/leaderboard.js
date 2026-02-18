// Get leaderboard data from localStorage
const leaderboardData =
    JSON.parse(localStorage.getItem("leaderboard")) || [];

const leaderboardBody = document.getElementById("leaderboardBody");

// If no data
if (leaderboardData.length === 0) {
    leaderboardBody.innerHTML = `
        <tr>
            <td colspan="5">No records found</td>
        </tr> 
    `;
} else {
    // Sort by score (highest first)
    leaderboardData.sort((a, b) => 
        b.score - a.score
);

    leaderboardData.forEach((item, index) => {
        const row = document.createElement("tr");
        
          let medalHTML;
          let medalLabel;
    if (index === 0) medalHTML= '<i class="fa-solid fa-medal gold"></i>';
    else if (index === 1) medal = '<i class="fa-solid fa-medal silver"></i>';
    else if (index === 2) medal = '<i class="fa-solid fa-medal bronze"></i>';
    else medal = index + 1;

        row.innerHTML = `
            <td>${medal}</td>
            <td>${item.name}</td>
            <td>${item.course}</td>
            <td>${item.score}/${item.total}</td>
            <td>${item.date}</td>
        `;

        leaderboardBody.appendChild(row);
    });
}
 // keyboard event
document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        const homeBtn = document.getElementById("homeBtn");

        if (homeBtn && !homeBtn.disabled) {
            homeBtn.click();
        }
    }
});


