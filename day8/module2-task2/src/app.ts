// create user interface

interface User{
    id: number;
    name: string;
    email: string;
    role: "Admin" | "User" | "Manager"; 
}

// create UserManager Class
class UserManager{

    private users: User[] = [];
    private currentId: number = 1;

    public addUser(name:string, email:string, role:"Admin"|"User" | "Manager"):void {
        const newUser: User={
            id:this.currentId++,
            name,
            email,
            role
        };
        this.users.push(newUser);
    }

    public getUsers(): User[]{  //Toaccess users safely
        return this.users;
    }


// use Generics

public findUserBy<T extends keyof User>(
    key: T,
    value: User[T]
): User | undefined {
    return this.users.find(user => user[key] === value);
}

// Update User Role(with validation)

public updateUserRole(
    userId: number,
    newRole: "Admin" | "User" | "Manager"
): boolean{
    const user = this.findUserBy("id",userId);

    if(!user){
        return false;
    }

    user.role =newRole;
    return true;
}


// delete user

public deleteUser(userId: number):void{
    this.users = this.users.filter(user=> user.id !== userId); 
}
}

// Dom Element
const nameInput = document.getElementById("name") as HTMLInputElement;
const emailInput = document.getElementById("email") as HTMLInputElement;
const roleSelect = document.getElementById("role") as HTMLSelectElement;
const addUserBtn = document.getElementById("addUserBtn") as HTMLButtonElement;

const userListSection = document.getElementById("userListSection") as HTMLElement;
const userList = document.getElementById("userList") as HTMLElement;

// Create UserManager object

const manager = new UserManager();

// Render Users
function renderUsers(): void{
    const users =  manager.getUsers();
    userList.innerHTML = "";

    if(users.length === 0){
        userListSection.classList.add("hidden");
        return;
    }

    userListSection.classList.remove("hidden");

    users.forEach(user=>{
        const row = document.createElement("div");
        row.className ="user-row";

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
addUserBtn.addEventListener("click", ()=>{
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const role = roleSelect.value as "Admin" | "User" | "Manager";

    if(!name || !email){
        alert("Please fill all fields");
        return;
    }
    manager.addUser(name, email, role);
    renderUsers();

    nameInput.value = "";
    emailInput.value = "";
});

// Edit / Delete using Event Delegation

userList.addEventListener("click", (event)=>{
    const target = event.target as HTMLElement;

    // delete
    if(target.dataset.delete){
        const id = Number(target.dataset.delete);
        manager.deleteUser(id);
        renderUsers();
    }
    //Edit(toggle role)
      if (target.dataset.edit) {
    const id = Number(target.dataset.edit);

    const roleInput = prompt(
      "Enter role to update:\nAdmin / User / Manager"
    );

    if (!roleInput) return;

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