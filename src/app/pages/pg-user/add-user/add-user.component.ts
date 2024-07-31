import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PgUserService } from 'src/app/services/pg-user/pg-user.service';

declare var bootstrap: any;

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  @Input() pgUser: any;
  @Input() isEditMode: boolean = false;
  @Output() pgUserUpdated: EventEmitter<void> = new EventEmitter<void>();

  pgUserForm: FormGroup;

  constructor(private fb: FormBuilder, private pgUserService: PgUserService) {
    this.pgUserForm = this.fb.group({
      full_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', Validators.required],
      address: ['', Validators.required],
      room_id: ['', Validators.required],
      booking_id: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.isEditMode && this.pgUser) {
      this.pgUserForm.patchValue(this.pgUser);
    }
  }

  savePGUser() {
    if (this.pgUserForm.valid) {
      if (this.isEditMode) {
        this.pgUserService.updatePGUser(this.pgUser.id, this.pgUserForm.value).subscribe(() => {
          this.pgUserUpdated.emit();
          this.closeModal();
        });
      } else {
        this.pgUserService.createPGUser(this.pgUserForm.value).subscribe(() => {
          this.pgUserUpdated.emit();
          this.closeModal();
        });
      }
    }
  }

  closeModal() {
    const modal = bootstrap.Modal.getInstance(document.getElementById('addEditPGUserModal'));
    modal.hide();
  }
}
