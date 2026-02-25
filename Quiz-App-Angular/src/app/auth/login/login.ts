import { Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login implements OnInit {

  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router) {}

  // ✅ Create default admin if not exists
  ngOnInit() {
    if (!localStorage.getItem("users")) {
      const users = [
        { id: 1, name: "Admin", email: "admin@gmail.com", password: "12345", role: "Admin" }
      ];
      localStorage.setItem("users", JSON.stringify(users));
    }
  }

 login() {

  if (!this.email || !this.password) {
    this.errorMessage = "Please enter email and password";
    return;
  }

  let users = JSON.parse(localStorage.getItem("users") || "[]");

  let user = users.find(
    (u: any) => u.email === this.email && u.password === this.password
  );

  if (!user) {
    this.errorMessage = "Invalid credentials.. Signup required!";
    setTimeout(() => {
      this.router.navigate(['/signup']);
    }, 1500);
    return;
  }

  // Assign roles properly
  if (user.email === 'admin@gmail.com') {
    user.role = 'Admin';  // Capital A to match later comparison
  } else {
    user.role = 'User';   // Normal user
  }

  // Save logged in user
  localStorage.setItem("currentUser", JSON.stringify(user));

  // Redirect based on role
  if (user.role === "Admin") {
    this.router.navigate(['/admin/dashboard']);
  } else {
    this.router.navigate(['/user/course']);
  }
}

  // ✅ ENTER KEY SUPPORT
  @HostListener('document:keydown.enter')
  handleEnter() {
    this.login();
  }
}