import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BookingRoomsService {
  private apiUrl = 'http://localhost:5000/api/bookings';

  constructor(private http: HttpClient) {}

  getBookings(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createBooking(booking: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, booking);
  }

  updateBooking(booking: any): Observable<any> {
    return this.http.put<any>(this.apiUrl, booking);
  }

  deleteBooking(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
