import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { MainContentComponent } from './layouts/main-content/main-content.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from './auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { PgUserComponent } from './pages/pg-user/pg-user.component';
import { AddUserComponent } from './pages/pg-user/add-user/add-user.component';
import { BookingRoomsComponent } from './pages/booking-rooms/booking-rooms.component';
import { RoomsComponent } from './pages/rooms/rooms.component';
import { AddBookingComponent } from './pages/booking-rooms/add-booking/add-booking.component';
import { AddRoomComponent } from './pages/rooms/add-room/add-room.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { AddPaymentComponent } from './pages/payment/add-payment/add-payment.component';
import { ReportsComponent } from './pages/reports/reports.component';
export function initializeApp(authService: AuthService) {
  return (): Promise<void> => {
    return new Promise((resolve) => {
      authService.initialize();
      resolve();
    });
  };
}
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    MainContentComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    PgUserComponent,
    AddUserComponent,
    BookingRoomsComponent,
    RoomsComponent,
    AddBookingComponent,
    AddRoomComponent,
    PaymentComponent,
    AddPaymentComponent,
    ReportsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AuthService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
