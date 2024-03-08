// import { Injectable } from '@angular/core';
// import { CanActivate, Router } from '@angular/router';
// import { AuthService } from '../Services/auth.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {

//   constructor(private authService: AuthService, private router: Router) {}

//   canActivate(): boolean {
//     const userRole = this.authService.getUserRole();
//     if (userRole === 'admin') {
//       return true; // Allow access for admins
//     } else if (userRole === 'user') {
//       this.router.navigate(['/home']); // Redirect users to home page
//       return false;
//     } else {
//       this.router.navigate(['/login']); // Redirect unauthorized users to login page
//       return false;
//     }
//   }
// }
