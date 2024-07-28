import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service'; // Adjust the path as necessary
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router,
    private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      full_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone_number: ['', [Validators.required, Validators.minLength(10)]],
      role: ['tenant'], // Default role
      terms: [false, [Validators.requiredTrue]]
    });
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      this.authService.register(this.signupForm.value).subscribe(
        response => {
          this.notificationService.success('Registration successful');
          this.router.navigate(['/login']);
        },
        error => {
          this.notificationService.error('Registration unsuccessful');
          console.error('Signup failed', error);
        }
      );
    }
  }
}
