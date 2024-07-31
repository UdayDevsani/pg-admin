import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private apiUrl = 'http://localhost:5000/api/rooms';

  constructor(private http: HttpClient) {}

  getRooms(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createRoom(room: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, room);
  }

  updateRoom(room: any): Observable<any> {
    return this.http.put<any>(this.apiUrl, room);
  }

  deleteRoom(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
