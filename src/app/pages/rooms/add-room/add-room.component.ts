import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RoomService } from 'src/app/services/room/room.service';

declare var bootstrap: any;

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.css']
})
export class AddRoomComponent {

  @Input() room: any;
  @Input() isEditMode: boolean = false;
  @Output() roomUpdated = new EventEmitter<void>();

  roomForm: FormGroup;

  constructor(private fb: FormBuilder, private roomService: RoomService) {
    this.roomForm = this.fb.group({
      room_number: [''],
      type: [''],
      rent: [''],
      status: [''],
      description: ['']
    });
  }

  ngOnChanges() {
    if (this.isEditMode && this.room) {
      this.roomForm.patchValue(this.room);
    } else {
      this.roomForm.reset();
    }
  }

  onSubmit() {
    if (this.isEditMode) {
      this.roomService.updateRoom(this.roomForm.value).subscribe(() => {
        this.roomUpdated.emit();
        this.closeModal();
      });
    } else {
      this.roomService.createRoom(this.roomForm.value).subscribe(() => {
        this.roomUpdated.emit();
        this.closeModal();
      });
    }
  }

  closeModal() {
    const modalElement = document.getElementById('addEditRoomModal');
    const modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();
  }
}
