
export interface User {
  name: string;
  email: string;
}

export interface Question {
  question: string;
  options: string[];
  answer: string;
}

export interface QuizResult {
  id: number;
  name: string;
  course: string;
  score: number;
  total: number;
  date: string;
}

export interface RecentQuiz {
  name: any;
  course: string;
  score: number;
  total: number;
  date: string;
}
