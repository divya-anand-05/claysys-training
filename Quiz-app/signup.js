function signup() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!name || !email || !password) {
        alert("All fields required");
        return;
    }



    //existing user read from Ls

    const users = JSON.parse(localStorage.getItem("users")) || [];

    //check email exists
    
    const exists = users.find(u => u.email === email);
    if (exists) {
        alert("User already exists");
        window.location.href = "login.html";
    }

    users.push({
        id: Date.now(),
        name,
        email,
        password,
        role: "User"
    });

    //save updated users to LS
    localStorage.setItem("users", JSON.stringify(users));
    alert("Signup successful. Please login.");
    window.location.href = "login.html";
}

// keyboard event
document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        const signupBtn = document.getElementById("signupBtn");

        if (signupBtn && !signupBtn.disabled) {
            signup();
        }
    }
});
