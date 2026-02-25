import { Component, HostListener } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './signup.html',
  styleUrls: ['./signup.css']
})
export class Signup {

  name: string = '';
  email: string = '';
  password: string = '';

  errorMessage: string = '';
  successMessage: string = '';

  constructor(private router: Router) {}

  signup() {

    if (!this.name || !this.email || !this.password) {
      this.errorMessage = "All fields required";
      this.successMessage = '';
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const exists = users.find((u: any) => u.email === this.email);

    if (exists) {
      this.errorMessage = "User already exists";
      this.successMessage = '';
      return;
    }

    users.push({
      id: Date.now(),
      name: this.name,
      email: this.email,
      password: this.password,
      role: "User"
    });

    localStorage.setItem("users", JSON.stringify(users));

    this.errorMessage = '';
    this.successMessage = "Signup successful! Redirecting to login...";

    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 1500);
  }

  // ENTER KEY SUPPORT
  @HostListener('document:keydown.enter')
  handleEnter() {
    this.signup();
  }
}