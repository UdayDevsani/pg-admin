import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private baseUrl = 'http://localhost:5000/api/reports'; // Base URL for reports API

  constructor(private http: HttpClient) {}

  // Fetch occupancy report data
  getOccupancyReport() {
    return this.http.get<any[]>(`${this.baseUrl}/occupancy`);
  }

  // Fetch payment report data
  getPaymentReport() {
    return this.http.get<any[]>(`${this.baseUrl}/payment`);
  }

  // Generate PDF report
  generatePDFReport(reportType: string, data: any[]) {
    const doc = new jsPDF();
    const title = `${reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report`;

    doc.text(title, 20, 10);

    const headers = reportType === 'occupancy' ?
      ['Room Number', 'Occupant Name', 'Occupancy Date'] :
      ['Payment ID', 'Booking ID', 'Amount', 'Payment Date', 'Payment Method', 'Status'];

    const reportData = reportType === 'occupancy' ?
      data.map(report => [report.room_number, report.occupant_name, report.occupancy_date]) :
      data.map(report => [report.payment_id, report.booking_id, report.amount, report.payment_date, report.payment_method, report.status]);

    autoTable(doc, {
      head: [headers],
      body: reportData,
      startY: 20
    });

    doc.save(`${reportType}-report.pdf`);
  }
}
