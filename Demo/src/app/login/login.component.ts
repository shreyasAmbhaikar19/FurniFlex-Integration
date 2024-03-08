import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../Services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  private subscription!: Subscription;

  formBuilder = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);
  
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]]
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  // onSubmit(): void {
  //   if (this.loginForm.valid) {
  //     this.subscription = this.authService.loginUser(this.loginForm.value)
  //       .subscribe({
  //         next: (response: any) => {
  //           console.log('User logged in successfully', response);
  //           this.router.navigate(['/home']); 
  //         },
  //         error: (error: any) => {
  //           console.error('Login failed', error);
  //           if (error.status === 401) {
  //             this.router.navigate(['/register']); 
  //           }
  //         }
  //       });
  //   }
  // }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.subscription = this.authService.loginUser(this.loginForm.value)
        .subscribe({
          next: (response: any) => {
            console.log('User logged in successfully', response);
            const userRole = response.user.role;
            if (userRole === 'user') {
              this.router.navigate(['/home']); 
            } else if (userRole === 'admin') {
              this.router.navigate(['/admin']); 
            }
          },
          error: (error: any) => {
            console.error('Login failed', error);
            if (error.status === 401) {
              this.router.navigate(['/register']);
            }
          }
        });
    }
  }
}
