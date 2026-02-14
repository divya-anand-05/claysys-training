"use strict";
// create user interface
// create UserManager Class
class UserManager {
    constructor() {
        this.users = [];
        this.currentId = 1;
    }
    addUser(name, email, role) {
        const newUser = {
            id: this.currentId++,
            name,
            email,
            role
        };
        this.users.push(newUser);
    }
    getUsers() {
        return this.users;
    }
    // use Generics
    findUserBy(key, value) {
        return this.users.find(user => user[key] === value);
    }
    // Update User Role(with validation)
    updateUserRole(userId, newRole) {
        const user = this.findUserBy("id", userId);
        if (!user) {
            return false;
        }
        user.role = newRole;
        return true;
    }
    // delete user
    deleteUser(userId) {
        this.users = this.users.filter(user => user.id !== userId);
    }
}
// Dom Element
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const roleSelect = document.getElementById("role");
const addUserBtn = document.getElementById("addUserBtn");
const userListSection = document.getElementById("userListSection");
const userList = document.getElementById("userList");
// Create UserManager object
const manager = new UserManager();
// Render Users
function renderUsers() {
    const users = manager.getUsers();
    userList.innerHTML = "";
    if (users.length === 0) {
        userListSection.classList.add("hidden");
        return;
    }
    userListSection.classList.remove("hidden");
    users.forEach(user => {
        const row = document.createElement("div");
        row.className = "user-row";
        row.innerHTML = `
        <span>${user.name}</span>
        <span>${user.email}</span>
        <span>${user.role}</span>
        <div class="actions">
        <button class="btn" data-edit="${user.id}">Edit</button>
        <button class="btn danger" data-delete="${user.id}">Delete</button>
        </div>`;
        userList.appendChild(row);
    });
}
// Add User Button click
addUserBtn.addEventListener("click", () => {
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const role = roleSelect.value;
    if (!name || !email) {
        alert("Please fill all fields");
        return;
    }
    manager.addUser(name, email, role);
    renderUsers();
    nameInput.value = "";
    emailInput.value = "";
});
// Edit / Delete using Event Delegation
userList.addEventListener("click", (event) => {
    const target = event.target;
    // delete
    if (target.dataset.delete) {
        const id = Number(target.dataset.delete);
        manager.deleteUser(id);
        renderUsers();
    }
    //Edit(toggle role)
    if (target.dataset.edit) {
        const id = Number(target.dataset.edit);
        const roleInput = prompt("Enter role to update:\nAdmin / User / Manager");
        if (!roleInput)
            return;
        const role = roleInput.trim();
        // VALIDATION
        if (role !== "Admin" && role !== "User" && role !== "Manager") {
            alert("Invalid role! Please enter Admin, User, or Manager");
            return;
        }
        manager.updateUserRole(id, role);
        renderUsers();
    }
});
