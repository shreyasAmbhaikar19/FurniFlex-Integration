// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { AuthService } from '../Services/auth.service';
// import { Subscription } from 'rxjs';

// @Component({
//   selector: 'app-register',
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.css']
// })
// export class RegisterComponent implements OnInit {
//   registerForm!: FormGroup;
//   private subscription: Subscription | undefined;

//   constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

//   ngOnInit(): void {
//     this.registerForm = this.formBuilder.group({
//       firstName: ['', Validators.required],
//       lastName: ['', Validators.required],
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', [Validators.required, Validators.minLength(8)]]
//     });
//   }

//   ngOnDestroy(): void {
//     if (this.subscription) {
//       this.subscription.unsubscribe();
//     }
//   }

//   onSubmit(): void {
//     if (this.registerForm.valid) {
//       this.subscription = this.authService.registerUser(this.registerForm.value)
//         .subscribe({
//           next: (response) => {
//             console.log('User registered successfully', response);
//             // Handle success, e.g., redirect to login page
//           },
//           error: (error) => {
//             console.error('Registration failed', error);
//             // Handle error, e.g., display error message to the user
//           }
//         });
//     }
//   }
// }


import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../Services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm!: FormGroup;
  private subscription!: Subscription;

  formBuilder = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);
  
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]]
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.subscription = this.authService.registerUser(this.registerForm.value)
        .subscribe({
          next: (response) => {
            console.log('User registered successfully', response);
            this.router.navigate(['/login']);
          },
          error: (error) => {
            console.error('Registration failed', error);
          }
        });
    }
  }
}
