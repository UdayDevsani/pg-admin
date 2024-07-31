import { Component, OnInit, ViewChild } from '@angular/core';
import { BookingRoomsService } from 'src/app/services/booking-rooms/booking-rooms.service';
import { AddBookingComponent } from './add-booking/add-booking.component';

declare var bootstrap: any;

@Component({
  selector: 'app-booking-rooms',
  templateUrl: './booking-rooms.component.html',
  styleUrls: ['./booking-rooms.component.css']
})
export class BookingRoomsComponent {

  bookings: any[] = [];
  selectedBooking: any;
  isEditMode: boolean = false;

  @ViewChild(AddBookingComponent) addEditBookingModal!: AddBookingComponent;

  constructor(private bookingRoomService: BookingRoomsService) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings() {
    this.bookingRoomService.getBookings().subscribe((bookings) => {
      this.bookings = bookings;
    });
  }

  openAddBookingModal() {
    this.isEditMode = false;
    this.selectedBooking = null;
    const modalElement = document.getElementById('addEditBookingModal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }

  openEditBookingModal(booking: any) {
    this.isEditMode = true;
    this.selectedBooking = booking;
    const modalElement = document.getElementById('addEditBookingModal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }

  deleteBooking(id: number) {
    this.bookingRoomService.deleteBooking(id).subscribe(() => {
      this.loadBookings();
    });
  }

  onBookingUpdated() {
    this.loadBookings();
  }
}
