import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pg-admin';
  isActive: boolean = false;
  isContentFullWidth: boolean = false;

  toggleSidebar() {
    this.isActive = !this.isActive;
    this.isContentFullWidth = !this.isActive;
  }
}
