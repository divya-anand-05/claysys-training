// src/app/admin-questions/admin-questions.component.ts
import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../services/question.service';
import { Question } from '../../models/question.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-questions',
   standalone: true,  
  imports: [CommonModule, FormsModule],
  templateUrl: './questions.html',
  styleUrls: ['./questions.css']
})
export class Questions implements OnInit {
  courses: { [key: string]: string[] } = {
    Frontend: ['HTML', 'CSS', 'JavaScript', 'React', 'Angular', 'Vue.js'],
    Backend: ['C#', 'Python', 'Java'],
    Database: ['SQL', 'MySQL', 'MongoDB']
  };

  get courseGroups(): string[] {
    return Object.keys(this.courses);
  }

  selectedCourse = '';
  questions: Question[] = [];
  editIndex: number | null = null;

  questionText = '';
  options = ['', '', '', ''];
  answer = '';

  constructor(private questionService: QuestionService,
    private router:Router
  ) {}

  ngOnInit(): void {}

  selectCourse(course: string) {
    this.selectedCourse = course;
    this.questions = this.questionService.getQuestions(course);
    this.resetForm();
  }

  addOrUpdateQuestion() {
    if (!this.selectedCourse || !this.questionText || this.options.some(o => !o) || !this.answer) {
      alert('All fields are required');
      return;
    }

    const newQuestion: Question = {
      question: this.questionText,
      options: [...this.options],
      answer: this.answer
    };

    this.questionService.addQuestion(this.selectedCourse, newQuestion, this.editIndex);
    alert(this.editIndex !== null ? 'Question updated' : 'Question added');

    this.questions = this.questionService.getQuestions(this.selectedCourse);
    this.resetForm();
  }

  editQuestion(index: number) {
    const q = this.questions[index];
    this.questionText = q.question;
    this.options = [...q.options];
    this.answer = q.answer;
    this.editIndex = index;
  }

  deleteQuestion(index: number) {
    this.questionService.deleteQuestion(this.selectedCourse, index);
    this.questions = this.questionService.getQuestions(this.selectedCourse);
  }
  

  resetForm() {
    this.questionText = '';
    this.options = ['', '', '', ''];
    this.answer = '';
    this.editIndex = null;
  }
    goBack() {
    this.router.navigate(['/admin/dashboard']);
  }
}