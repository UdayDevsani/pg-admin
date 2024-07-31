import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private baseUrl = 'http://localhost:5000/api/payments';

  constructor(private http: HttpClient) {}

  getPayments(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }

  createPayment(payment: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, payment);
  }

  updatePayment(payment: any): Observable<any> {
    return this.http.put<any>(this.baseUrl, payment);
  }

  deletePayment(payment_id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${payment_id}`);
  }
}
