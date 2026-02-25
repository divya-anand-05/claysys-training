import { Routes } from '@angular/router';

import { Login } from './auth/login/login';
import { Signup } from './auth/signup/signup';

import { Course } from './user/course/course';
import { Quiz } from './user/quiz/quiz';
import { Result } from './user/result/result';
import { Leaderboard as UserLeaderboard } from './user/leaderboard/leaderboard';

import { Dashboard } from './admin/dashboard/dashboard';
import { Questions } from './admin/questions/questions';
import { Leaderboard as AdminLeaderboard } from './admin/leaderboard/leaderboard';

import { adminGuard } from './admin/admin-guard';

export const routes: Routes = [

  // AUTH
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'signup', component: Signup },

  // USER
  { path: 'user/course', component: Course },
  { path: 'user/quiz', component: Quiz },
  { path: 'user/result', component: Result },
  { path: 'user/leaderboard', component: UserLeaderboard },

  // ADMIN
  { path: 'admin/dashboard', component: Dashboard, canActivate: [adminGuard] },
  { path: 'admin/questions', component: Questions, canActivate: [adminGuard] },
  { path: 'admin/leaderboard', component: AdminLeaderboard, canActivate: [adminGuard] },

];