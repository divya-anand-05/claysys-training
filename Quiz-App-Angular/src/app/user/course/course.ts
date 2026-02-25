import { Component, OnInit, OnDestroy, ViewEncapsulation, HostListener } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './course.html',
  styleUrls: ['./course.css'],
  encapsulation: ViewEncapsulation.None
})
export class Course implements OnInit, OnDestroy {

  username: string = '';
  selectedCourse: string = '';
  errorMessage: string = '';

  currentUser: any = null;
  recentQuizzes: any[] = [];

  isDark: boolean = false;
  private themeSubscription?: Subscription;

  courses: string[] = [
    "JavaScript",
    "HTML",
    "CSS",
    "React",
    "Angular",
    "Vue.js",
    "C#",
    "Java",
    "Python",
    "SQL",
    "MySQL",
    "MongoDB"
  ];

  constructor(
    private router: Router,
    private themeService: ThemeService
  ) {
    this.loadRecentQuizzes();
  }

  ngOnInit(): void {
    //Load saved theme
    this.themeService.loadTheme();

    // Subscribe to theme changes
    this.themeSubscription = this.themeService.isDark$.subscribe(dark => {
      this.isDark = dark;
       console.log('Theme changed:', dark ? 'DARK' : 'LIGHT');
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe when component is destroyed
    if (this.themeSubscription) {
      this.themeSubscription?.unsubscribe();
    }
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  selectCourse(course: string) {
    if (this.selectedCourse === course) {
      this.selectedCourse = '';
    } else {
      this.selectedCourse = course;
    }
    this.errorMessage = ''; // Clear error when user selects a course
  }

  onUsernameChange() {
    this.errorMessage = ''; // Clear error when user types a name
  }

  startQuiz() {
    if (!this.username.trim()) {
      this.errorMessage = "Please enter your name";
      return;
    }

    if (!this.selectedCourse) {
      this.errorMessage = "Please select a course";
      return;
    }

    this.errorMessage = ''; // Clear error on success

    localStorage.setItem("username", this.username);
    localStorage.setItem("course", this.selectedCourse);

    this.router.navigate(['user/quiz']);
  }

  loadRecentQuizzes() {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");

    if (!this.currentUser) {
      return;
    }

    const key = `recentQuizzes_${this.currentUser.email}`;
    this.recentQuizzes = JSON.parse(localStorage.getItem(key) || "[]");
  }

  logout() {
    if (this.currentUser?.role === "User") {
      let loggedInCount = parseInt(localStorage.getItem("totalUsersLoggedIn") || "0");
      loggedInCount = Math.max(loggedInCount - 1, 0);
      localStorage.setItem("totalUsersLoggedIn", loggedInCount.toString());
    }

    localStorage.removeItem("currentUser");

    this.router.navigate(['/login']);
  }

   // Keyboard Enter support
  @HostListener('document:keydown.enter')
  handleEnter() {
    this.startQuiz();
  }
}