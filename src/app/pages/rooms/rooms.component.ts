import { Component, OnInit, ViewChild } from '@angular/core';
import { RoomService } from 'src/app/services/room/room.service';
import { AddRoomComponent } from './add-room/add-room.component';


declare var bootstrap: any;

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent {

  rooms: any[] = [];
  selectedRoom: any;
  isEditMode: boolean = false;

  @ViewChild(AddRoomComponent) addEditRoomModal!: AddRoomComponent;

  constructor(private roomService: RoomService) {}

  ngOnInit(): void {
    this.loadRooms();
  }

  loadRooms() {
    this.roomService.getRooms().subscribe((rooms) => {
      this.rooms = rooms;
    });
  }

  openAddRoomModal() {
    this.isEditMode = false;
    this.selectedRoom = null;
    const modalElement = document.getElementById('addEditRoomModal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }

  openEditRoomModal(room: any) {
    this.isEditMode = true;
    this.selectedRoom = room;
    const modalElement = document.getElementById('addEditRoomModal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }

  deleteRoom(id: number) {
    this.roomService.deleteRoom(id).subscribe(() => {
      this.loadRooms();
    });
  }

  onRoomUpdated() {
    this.loadRooms();
  }

}
