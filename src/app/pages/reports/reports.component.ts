import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../services/reports/reports.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  occupancyReports: any[] = [];
  paymentReports: any[] = [];

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
    this.fetchOccupancyReport();
    this.fetchPaymentReport();
  }

  fetchOccupancyReport(): void {
    this.reportService.getOccupancyReport().subscribe(
      data => {
        console.log('Occupancy report data:', data);
        this.occupancyReports = data;
      },
      err => {
        console.error('Error fetching occupancy report:', err);
      }
    );
  }

  fetchPaymentReport(): void {
    this.reportService.getPaymentReport().subscribe(
      data => {
        console.log('Payment report data:', data);
        this.paymentReports = data;
      },
      err => {
        console.error('Error fetching payment report:', err);
      }
    );
  }

  generatePDFReport(reportType: string): void {
    const data = reportType === 'occupancy' ? this.occupancyReports : this.paymentReports;
    this.reportService.generatePDFReport(reportType, data);
  }
}
