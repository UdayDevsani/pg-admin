import { Component, OnInit, ViewChild } from '@angular/core';
import { PgUserService } from 'src/app/services/pg-user/pg-user.service';
import { AddUserComponent } from './add-user/add-user.component';

declare var bootstrap: any;

@Component({
  selector: 'app-pg-user',
  templateUrl: './pg-user.component.html',
  styleUrls: ['./pg-user.component.css']
})
export class PgUserComponent implements OnInit {
  pgUsers: any[] = [];
  selectedUser: any;
  isEditMode: boolean = false;

  @ViewChild(AddUserComponent) addEditPgUserModal!: AddUserComponent;

  constructor(private pgUserService: PgUserService) {}

  ngOnInit(): void {
    this.loadPGUsers();
  }

  loadPGUsers() {
    this.pgUserService.getPGUsers().subscribe((users) => {
      this.pgUsers = users;
    });
  }

  openAddPGUserModal() {
    this.isEditMode = false;
    this.selectedUser = null;
    const modalElement = document.getElementById('addEditPGUserModal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }

  openEditPGUserModal(user: any) {
    this.isEditMode = true;
    this.selectedUser = user;
    const modalElement = document.getElementById('addEditPGUserModal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }

  deletePGUser(id: number) {
    this.pgUserService.deletePGUser(id).subscribe(() => {
      this.loadPGUsers();
    });
  }

  onPGUserUpdated() {
    this.loadPGUsers();
  }
}
