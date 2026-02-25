import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

  if (currentUser && currentUser.role === 'Admin') {
    // Allow access
    return true;
  }

  // Not admin → redirect
  alert('Access denied. Admins only.');
  router.navigate(['/login']);
  return false;
};