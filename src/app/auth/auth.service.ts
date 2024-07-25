import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isLoggedIn = false;

  constructor(private router: Router) {}

  initialize() {
    const loggedIn = localStorage.getItem('isLoggedIn');
    this._isLoggedIn = loggedIn === 'true';
  }

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === 'admin') {
      this._isLoggedIn = true;
      localStorage.setItem('isLoggedIn', 'true');
      return true;
    }
    this._isLoggedIn = false;
    localStorage.setItem('isLoggedIn', 'false');
    return false;
  }

  logout(): void {
    this._isLoggedIn = false;
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this._isLoggedIn;
  }
}
