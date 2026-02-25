import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ThemeService } from '../../services/theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  encapsulation:ViewEncapsulation.None
})
export class Dashboard implements OnInit, OnDestroy {

  totalQuestions: number = 0;
  totalUsers: number = 0;
  totalScores: number = 0;

  isDark: boolean = false;
  private themeSubscription: Subscription;

  adminName: string = '';

  constructor(
    private router: Router,
    private themeService: ThemeService
  ) {
    this.themeSubscription = new Subscription();
  }

  ngOnInit(): void {
    this.updateDashboardStats();
    this.getAdminName();

    // Subscribe to theme changes
    this.themeSubscription = this.themeService.isDark$.subscribe(dark => {
      this.isDark = dark;
    });
  }

  ngOnDestroy(): void {
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }

  updateDashboardStats() {
    // Questions
    const questions = JSON.parse(localStorage.getItem("questions") || "{}");
    let total = 0;
    for (let course in questions) {
      total += questions[course].length;
    }
    this.totalQuestions = total;

    // Users
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    this.totalUsers = users.filter((u: any) => u.role === "User").length;

    // Leaderboard
    const leaderboard = JSON.parse(localStorage.getItem("leaderboard") || "[]");
    this.totalScores = leaderboard.length;
  }

  getAdminName() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
    this.adminName = currentUser?.name || "Admin";
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  goToQuestions() {
    this.router.navigate(['/admin/questions']);
  }

  goToLeaderboard() {
    this.router.navigate(['/admin/leaderboard']);
  }

  logout() {
    localStorage.removeItem("currentUser");
    this.router.navigate(['/login']);
  }
}