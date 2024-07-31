import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PgUserService {
  private apiUrl = 'http://localhost:5000/api/pgUsers';

  constructor(private http: HttpClient) {}

  createPGUser(pgUser: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, pgUser);
  }

  getPGUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getPGUserById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  updatePGUser(id: number, pgUser: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, pgUser);
  }

  deletePGUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
