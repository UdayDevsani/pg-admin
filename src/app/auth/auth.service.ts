import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isLoggedIn = false;
  private baseUrl = 'http://localhost:5000/api/auth';

  constructor(private router: Router, private http: HttpClient) {}

  initialize() {
    const loggedIn = localStorage.getItem('isLoggedIn');
    this._isLoggedIn = loggedIn === 'true';
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, { username, password }).pipe(
      tap(response => {
        if (response && response.token) {
          this._isLoggedIn = true;
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('token', response.token);
        }
      })
    );
  }

  logout(): void {
    this._isLoggedIn = false;
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this._isLoggedIn;
  }

  register(user: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, user);
  }
}
