import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface LeaderboardItem {
  id: number;
  name: string;
  course: string;
  score: number;
  total: number;
  date: string;
}

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './leaderboard.html',
  styleUrls: ['./leaderboard.css']
})
export class Leaderboard {
  courses: string[] = [
    'HTML','CSS','JavaScript','React','Angular','Vue.js',
    'C#','Python','Java','SQL','MySQL','MongoDB'
  ];

  selectedCourse = '';
  leaderboard: LeaderboardItem[] = [];
  currentRowIndex = -1;

  constructor(private router: Router) {
    this.loadLeaderboard();
  }

  loadLeaderboard() {
    
    if (!this.selectedCourse) {
      this.leaderboard = [];
      return;
    }

    let allData: LeaderboardItem[] = JSON.parse(localStorage.getItem('leaderboard') || '[]');

    // Filter & sort
    this.leaderboard = allData
      .filter(item => item.course === this.selectedCourse)
      .sort((a,b) => b.score - a.score);
  }

  deleteScore(id: number) {
    if (!confirm('Are you sure you want to delete this entry?')) return;

    let allData: LeaderboardItem[] = JSON.parse(localStorage.getItem('leaderboard') || '[]');
    
    // Find and delete only the entry with matching id AND selected course
    allData = allData.filter(item => !(item.id === id && item.course === this.selectedCourse));
    
    localStorage.setItem('leaderboard', JSON.stringify(allData));
    this.loadLeaderboard();
  }

  editScore(id: number) {
    const entry = this.leaderboard.find(item => item.id === id);
    if (entry) {
      const newScore = prompt(`Enter new score (out of ${entry.total}):`, entry.score.toString());
      if (newScore === null) return;

      const score = parseInt(newScore);
      if (isNaN(score) || score < 0 || score > entry.total) {
        alert('Please enter a valid score');
        return;
      }

      let allData: LeaderboardItem[] = JSON.parse(localStorage.getItem('leaderboard') || '[]');
      
      // Update only the entry with matching id AND selected course
      allData = allData.map(item => {
        if (item.id === id && item.course === this.selectedCourse) {
          return { ...item, score };
        }
        return item;
      });

      localStorage.setItem('leaderboard', JSON.stringify(allData));
      this.loadLeaderboard();
    }
  }

  goBack() {
    this.router.navigate(['/admin/dashboard']);
  }
}