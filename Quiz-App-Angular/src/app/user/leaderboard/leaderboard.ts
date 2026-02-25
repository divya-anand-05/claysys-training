import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './leaderboard.html',
  styleUrl: './leaderboard.css'
})
export class Leaderboard implements OnInit {

  leaderboardData: any[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    let data = localStorage.getItem('leaderboard');
    this.leaderboardData = data ? JSON.parse(data) : [];

    // REMOVE DUPLICATES - Keep only unique entries
    this.leaderboardData = this.removeDuplicates(this.leaderboardData);

    // Sort by score (highest first), then by date (newest first)
    this.leaderboardData.sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    // Save cleaned data back to localStorage
    localStorage.setItem('leaderboard', JSON.stringify(this.leaderboardData));
  }

  // Remove duplicate entries
  removeDuplicates(data: any[]): any[] {
    const seen = new Set<string>();
    const unique: any[] = [];

    for (const item of data) {
      // Create a unique key combining name, course, and score
      const key = `${item.name}_${item.course}_${item.score}_${item.date}`;
      
      if (!seen.has(key)) {
        seen.add(key);
        unique.push(item);
      }
    }

    return unique;
  }

  getMedalClass(index: number): string {
    if (index === 0) return 'gold';
    if (index === 1) return 'silver';
    if (index === 2) return 'bronze';
    return '';
  }

  isMedalPosition(index: number): boolean {
    return index < 3;
  }

  goHome() {
    this.router.navigate(['user/course']);
  }

  // Keyboard Enter support
  @HostListener('document:keydown.enter')
  handleEnter() {
    this.goHome();
  }
}