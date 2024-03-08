import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'http://localhost:3000/api/v1'; 

  constructor(private http: HttpClient) {}

  registerUser(userData: any) {
    return this.http.post(`${this.baseUrl}/register`, userData);
  }

  // loginUser(userData: any) {
  //   return this.http.post(`${this.baseUrl}/login`, userData);
  // }

  loginUser(userData: any) {
    return this.http.post(`${this.baseUrl}/login`, userData).pipe(
      tap((response: any) => {
        if (response.success && response.token) {
          localStorage.setItem('token', response.token); 
        }
      })
    );
  }

  logoutUser() {
    return this.http.get(`${this.baseUrl}/logout`);
  }

  forgotPassword(email: string) {
    return this.http.post(`${this.baseUrl}/password/forgot`, { email });
  }

  resetPassword(token: string, newPassword: string) {
    return this.http.put(`${this.baseUrl}/password/reset/${token}`, { newPassword });
  }

  updatePassword(newPassword: string) {
    return this.http.put(`${this.baseUrl}/password/update`, { newPassword });
  }
}



