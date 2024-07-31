import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import * as echarts from 'echarts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  totalUsers: number = 0;
  totalRooms: number = 0;
  totalBookings: number = 0;
  totalPayments: number = 0;
  lineChartOptions: any;
  barChartOptions: any;
  pieChartOptions: any;
  fetchedChartData: any;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.fetchDashboardData();
  }

  ngAfterViewInit(): void {
    // Initialize charts only after data is fetched
  }

  fetchDashboardData(): void {
    this.dashboardService.getDashboardData().subscribe(data => {
      this.totalUsers = data.totalUsers;
      this.totalRooms = data.totalRooms;
      this.totalBookings = data.totalBookings;
      this.totalPayments = data.totalPayments;
      this.fetchedChartData = data.chartData; // Assuming the data structure

      this.initializeCharts();
    });
  }

  initializeCharts(): void {
    this.initializeLineChart();
    this.initializeBarChart();
    this.initializePieChart();
  }

  initializeLineChart(): void {
    this.lineChartOptions = {
      title: {
        text: 'Room Occupancy'
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        data: this.fetchedChartData.lineChart.xAxisData
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'Occupancy',
          type: 'line',
          data: this.fetchedChartData.lineChart.seriesData
        }
      ]
    };

    const lineChartDom = document.getElementById('line-chart') as HTMLElement;
    const lineChart = echarts.init(lineChartDom);
    lineChart.setOption(this.lineChartOptions);
  }

  initializeBarChart(): void {
    this.barChartOptions = {
      title: {
        text: 'Bookings per Day'
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        // data: this.fetchedChartData.barChart.xAxisData
        data: [120, 200, 150, 80, 70, 110, 130]
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'Bookings',
          type: 'bar',
          // data: this.fetchedChartData.barChart.seriesData
          data: [120, 200, 150, 80, 70, 110, 130]
        }
      ]
    };

    const barChartDom = document.getElementById('bar-chart') as HTMLElement;
    const barChart = echarts.init(barChartDom);
    barChart.setOption(this.barChartOptions);
  }

  initializePieChart(): void {
    this.pieChartOptions = {
      title: {
        text: 'Payment Methods'
      },
      tooltip: {
        trigger: 'item'
      },
      series: [
        {
          name: 'Payments',
          type: 'pie',
          radius: '50%',
          // data: this.fetchedChartData.pieChart.seriesData,
          data: [120, 200, 150, 80, 70, 110, 130],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };

    const pieChartDom = document.getElementById('pie-chart') as HTMLElement;
    const pieChart = echarts.init(pieChartDom);
    pieChart.setOption(this.pieChartOptions);
  }
}
