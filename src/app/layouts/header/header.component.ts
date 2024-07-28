import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private authService: AuthService,
    private notificationService: NotificationService) {}
  toggle(){
    const element = document.body as HTMLElement
    element.classList.toggle('toggle-sidebar')
  }

  logout() {
    this.authService.logout();
    this.notificationService.success('Logout Successfully!!');
  }
}
