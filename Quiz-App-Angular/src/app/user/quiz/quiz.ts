import { Component, OnInit, OnDestroy, NgZone, ChangeDetectorRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Defaultquestions } from '../../data/default-questions';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz.html',
  styleUrls: ['./quiz.css']
})
export class Quiz implements OnInit, OnDestroy {

  course: string = '';
  username: string = '';

  questions: any[] = [];
  currentIndex: number = 0;
  score: number = 0;
  selectedAnswer: string = '';

  timeLeft: number = 15;
  interval: any;

  // New properties for answer feedback
  showFeedback: boolean = false;
  correctAnswer: string = '';
  isAnswerCorrect: boolean = false;

  // Keyboard navigation properties
  focusedOptionIndex: number = 0;

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (!currentUser) {
      alert('Please login first');
      this.router.navigate(['/login']);
      return;
    }

    this.username = currentUser.name;
    this.course = localStorage.getItem('course') || '';

    // Load admin questions from localStorage
    const allQuestions = JSON.parse(localStorage.getItem('questions') || '{}');
    const adminQuestions = allQuestions[this.course] || [];

    if (adminQuestions.length === 0) {
      // No admin questions → use default questions
      this.questions = Defaultquestions[this.course] || [];
    } else {
      // Use admin questions
      this.questions = adminQuestions;
    }

    if (!this.questions.length) {
      alert('No questions available!');
      this.router.navigate(['/course']);
      return;
    }

    this.startTimer();
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  // Keyboard navigation using @HostListener
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    // Don't handle keyboard if feedback is showing
    if (this.showFeedback) {
      return;
    }

    if (!this.currentQuestion) {
      return;
    }

    const options = this.currentQuestion.options;
    const optionCount = options.length;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.focusedOptionIndex = (this.focusedOptionIndex + 1) % optionCount;
      console.log('Down pressed, focused index:', this.focusedOptionIndex);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.focusedOptionIndex = (this.focusedOptionIndex - 1 + optionCount) % optionCount;
      console.log('Up pressed, focused index:', this.focusedOptionIndex);
    } else if (event.key === 'Enter') {
      event.preventDefault();
      const focusedOption = options[this.focusedOptionIndex];
      console.log('Enter pressed, selecting:', focusedOption);
      this.selectOption(focusedOption);
    }
  }

  get currentQuestion() {
    return this.questions[this.currentIndex];
  }

  selectOption(option: string) {
    // Don't allow selecting if feedback is already shown
    if (this.showFeedback) return;

    this.selectedAnswer = option;
    this.correctAnswer = this.currentQuestion.answer;
    this.isAnswerCorrect = option === this.correctAnswer;
    this.showFeedback = true;

    // Pause timer when answer is selected
    clearInterval(this.interval);

    // Auto-advance after 2 seconds
    setTimeout(() => {
      this.moveToNextQuestion();
    }, 2000);
  }

  moveToNextQuestion() {
    // Update score if correct
    if (this.isAnswerCorrect) {
      this.score++;
    }

    // Reset for next question
    this.selectedAnswer = '';
    this.showFeedback = false;
    this.focusedOptionIndex = 0; // Reset focused option
    this.currentIndex++;

    if (this.currentIndex < this.questions.length) {
      this.startTimer();
    } else {
      this.finishQuiz();
    }
  }

  startTimer() {
    clearInterval(this.interval);
    this.timeLeft = 15;

    // Run timer OUTSIDE Angular zone for better performance
    this.ngZone.runOutsideAngular(() => {
      this.interval = setInterval(() => {
        this.timeLeft--;

        // Update view inside Angular zone
        this.ngZone.run(() => {
          this.cdr.detectChanges();
        });

        if (this.timeLeft === 0) {
          clearInterval(this.interval);
          this.ngZone.run(() => {
            // If no answer selected, move to next
            if (!this.showFeedback) {
              this.currentIndex++;

              if (this.currentIndex >= this.questions.length) {
                this.finishQuiz();
              } else {
                this.startTimer();
              }
            }
          });
        }
      }, 1000);
    });
  }

  finishQuiz() {
    clearInterval(this.interval);

    localStorage.setItem('score', this.score.toString());
    localStorage.setItem('total', this.questions.length.toString());

    // Get current user
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');

    if (currentUser) {
      const key = `recentQuizzes_${currentUser.email}`;

      // Load existing recent quizzes
      let recentQuizzes = JSON.parse(localStorage.getItem(key) || '[]');

      // Add new quiz attempt at the TOP (unshift instead of push)
      recentQuizzes.unshift({
        name: this.username,
        course: this.course,
        score: this.score,
        total: this.questions.length,
        date: new Date().toLocaleDateString()
      });

      // Keep only the 5 most recent quizzes
      recentQuizzes = recentQuizzes.slice(0, 5);

      // Save back to localStorage
      localStorage.setItem(key, JSON.stringify(recentQuizzes));
    }

    const leaderboard = JSON.parse(localStorage.getItem('leaderboard') || '[]');

    leaderboard.push({
      name: this.username,
      course: this.course,
      score: this.score,
      total: this.questions.length,
      date: new Date().toLocaleDateString()
    });

    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));

    this.router.navigate(['user/result']);
  }

  get progressPercentage() {
    return ((this.currentIndex + 1) / this.questions.length) * 100;
  }
}