import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as echarts from 'echarts';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  totalRooms = 50;
  bookedRooms = 30;
  availableRooms = 20;
  totalGuests = 45;
  newBookings = 5;
  pendingInquiries = 2;
  revenue = [2000, 7000, 8000, 10000];
  recentBookings = [
    { details: 'Booking 1 details' },
    { details: 'Booking 2 details' }
  ];
  upcomingActivities = [
    { details: 'Activity 1 details' },
    { details: 'Activity 2 details' }
  ];

  isDropdownOpen = false;

  cards = [
    { title: 'Total Rooms', value: this.totalRooms },
    { title: 'Booked Rooms', value: this.bookedRooms },
    { title: 'Available Rooms', value: this.availableRooms },
    { title: 'Total Guests', value: this.totalGuests },
    { title: 'New Bookings', value: this.newBookings },
    { title: 'Pending Inquiries', value: this.pendingInquiries },
    { title: 'Revenue', value: this.revenue }
  ];

  quickActions = [
    { label: 'Book a Room', link: '/book' },
    { label: 'View Rooms', link: '/rooms' },
    { label: 'Add New Room', link: '/add-room' },
    { label: 'Manage Guests', link: '/manage-guests' },
    { label: 'Send Notifications', link: '/send-notifications' }
  ];

  constructor() { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.initRoomsChart();
    this.initRevenueChart();
    // this.initReportsChart();
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  initRoomsChart() {
    const roomsChart = echarts.init(document.getElementById('roomsChart') as HTMLDivElement);

    const roomsOption = {
      title: {
        text: 'Rooms Overview'
      },
      tooltip: {},
      legend: {
        data: ['Rooms']
      },
      xAxis: {
        data: ['Total Rooms', 'Booked Rooms', 'Available Rooms']
      },
      yAxis: {},
      series: [{
        name: 'Rooms',
        type: 'bar',
        data: [this.totalRooms, this.bookedRooms, this.availableRooms]
      }]
    };

    roomsChart.setOption(roomsOption);
  }

  initRevenueChart() {
    const revenueChart = echarts.init(document.getElementById('revenueChart') as HTMLDivElement);

    const revenueOption = {
      title: {
        text: 'Revenue Overview'
      },
      tooltip: {},
      legend: {
        data: ['Revenue']
      },
      xAxis: {
        type: 'category',
        data: ['Q1', 'Q2', 'Q3', 'Q4']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        name: 'Revenue',
        type: 'scatter',
        smooth: true,
        data: this.revenue
      }]
    };

    revenueChart.setOption(revenueOption);
  }
}
