
import { Injectable } from '@angular/core';
import { Question } from '../models/question.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private storageKey = 'questions';
  private questions: { [course: string]: Question[] } = {};

  constructor() {
    this.questions = JSON.parse(localStorage.getItem(this.storageKey) || '{}');
  }

  getQuestions(course: string): Question[] {
    return this.questions[course] || [];
  }

  addQuestion(course: string, question: Question, editIndex: number | null = null) {
    if (!this.questions[course]) this.questions[course] = [];

    if (editIndex !== null) {
      this.questions[course][editIndex] = question;
    } else {
      this.questions[course].push(question);
    }

    localStorage.setItem(this.storageKey, JSON.stringify(this.questions));
  }

  deleteQuestion(course: string, index: number) {
    if (this.questions[course]) {
      this.questions[course].splice(index, 1);
      localStorage.setItem(this.storageKey, JSON.stringify(this.questions));
    }
  }
}