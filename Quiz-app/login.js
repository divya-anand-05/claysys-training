
if (!localStorage.getItem("users")) {
    const users = [
        { id: 1, name: "Admin", email: "admin@example.com", password: "12345", role: "Admin" }
    ];
    localStorage.setItem("users", JSON.stringify(users));
}


function login() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    

    if (!email || !password) {
        alert("Please enter email and password");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if user exists
    let user = users.find(u => u.email === email && u.password === password);

        
        if (!user) {
            alert("Invalid credentials..Signup required!");
            window.location.href = "signup.html";
            return;
        }
    

    // Save current logged-in user
    localStorage.setItem("currentUser", JSON.stringify(user));


    // Redirect based on role
    if (user.role === "Admin") {
        window.location.href = "Admin/index.html";
    } else {
        window.location.href = "User/index.html";
    }
}

// keyboard event
document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        const loginBtn = document.getElementById("loginBtn");

        if (loginBtn && !loginBtn.disabled) {
            login();
        }
    }
});
