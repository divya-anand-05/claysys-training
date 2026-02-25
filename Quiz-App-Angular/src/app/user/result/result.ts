import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './result.html',
  styleUrls: ['./result.css']
})
export class Result implements OnInit {

  score: number = 0;
  total: number = 0;
  username: string = '';
  course: string = '';
  percentage: number = 0;

  radius: number = 70;
  circumference: number = 0;
  offset: number = 0;

  constructor(private router: Router) {}

  ngOnInit(): void {

    this.score = Number(localStorage.getItem('score'));
    this.total = Number(localStorage.getItem('total'));
    this.username = localStorage.getItem('username') || '';
    this.course = localStorage.getItem('course') || '';

    this.percentage = Math.round((this.score / this.total) * 100);

    this.circumference = 2 * Math.PI * this.radius;
    this.offset =
      this.circumference -
      (this.percentage / 100) * this.circumference;

    this.saveToLeaderboard();
  }

  saveToLeaderboard() {

    let leaderboard =
      JSON.parse(localStorage.getItem('leaderboard') || '[]');

    leaderboard.push({
      id: Date.now(),
      name: this.username,
      course: this.course,
      score: this.score,
      total: this.total,
      date: new Date().toLocaleDateString()
    });

    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
  }

  retryQuiz() {
    this.router.navigate(['user/quiz']);
  }

  goHome() {
    this.router.navigate(['user/course']);
  }

  goLeaderboard() {
    this.router.navigate(['user/leaderboard']);
  }
}