import { Component, Output, EventEmitter } from '@angular/core';
import { ToastService } from 'angular-toastify';
import { AuthService } from './auth/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public authService: AuthService, private toastService: ToastService) {
    this.toastService.success('Toastify is working!');}

  title = 'pg-admin';
  isSidebarToggled: boolean = false;
  isContentFullWidth: boolean = false;

  toggleSidebar() {
    this.isSidebarToggled = !this.isSidebarToggled;
  }
}
