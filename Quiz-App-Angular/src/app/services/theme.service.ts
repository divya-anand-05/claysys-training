import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDarkSubject = new BehaviorSubject<boolean>(false);
  public isDark$ = this.isDarkSubject.asObservable();

  toggleTheme(): void {
    const isDark = !this.isDarkSubject.value;
    this.isDarkSubject.next(isDark);
    
    // Toggle body class - THIS IS THE KEY!
    document.body.classList.toggle('dark', isDark);
    
    // Save to localStorage
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }

  loadTheme(): void {
    const savedTheme = localStorage.getItem('theme');
    const isDark = savedTheme === 'dark';
    this.isDarkSubject.next(isDark);
    document.body.classList.toggle('dark', isDark);
  }
}
