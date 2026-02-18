const themeToggle = document.getElementById("themeToggle");

// Toggle function 
function toggleTheme() {
    document.body.classList.toggle("dark");

    // theme change
    const isDark = document.body.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");

    // icon change
    if (themeToggle) {
        themeToggle.innerHTML = isDark
            ? '<i class="fa-solid fa-sun"></i>'
            : '<i class="fa-solid fa-moon"></i>';
    }
}

//  apply saved theme on page load
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
    document.body.classList.add("dark");
    if (themeToggle) {
        themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }
}

//  Button click
if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
}

//  Keyboard shortcut (D key)
document.addEventListener("keydown", (e) => {
    if (
        e.key.toLowerCase() === "d" &&
        !["input", "textarea"].includes(
            document.activeElement.tagName.toLowerCase()
        )
    ) {
        toggleTheme();
    }
});
