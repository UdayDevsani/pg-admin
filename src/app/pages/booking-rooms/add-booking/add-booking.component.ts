import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BookingRoomsService } from 'src/app/services/booking-rooms/booking-rooms.service';

declare var bootstrap: any;

@Component({
  selector: 'app-add-booking',
  templateUrl: './add-booking.component.html',
  styleUrls: ['./add-booking.component.css']
})
export class AddBookingComponent {

  @Input() booking: any;
  @Input() isEditMode: boolean = false;
  @Output() bookingUpdated = new EventEmitter<void>();

  bookingForm: FormGroup;

  constructor(private fb: FormBuilder, private bookingRoomService: BookingRoomsService) {
    this.bookingForm = this.fb.group({
      user_id: [''],
      room_id: [''],
      start_date: [''],
      end_date: [''],
      status: ['']
    });
  }

  ngOnChanges() {
    if (this.isEditMode && this.booking) {
      this.bookingForm.patchValue(this.booking);
    } else {
      this.bookingForm.reset();
    }
  }

  onSubmit() {
    if (this.isEditMode) {
      this.bookingRoomService.updateBooking(this.bookingForm.value).subscribe(() => {
        this.bookingUpdated.emit();
        this.closeModal();
      });
    } else {
      this.bookingRoomService.createBooking(this.bookingForm.value).subscribe(() => {
        this.bookingUpdated.emit();
        this.closeModal();
      });
    }
  }

  closeModal() {
    const modalElement = document.getElementById('addEditBookingModal');
    const modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();
  }
}
