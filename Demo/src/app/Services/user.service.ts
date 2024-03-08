import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = 'http://localhost:3000/api/v1'; // Replace with your actual backend URL

  constructor(private http: HttpClient) {}

  getUserDetails() {
    return this.http.get(`${this.baseUrl}/me`);
  }

  updateProfile(userData: any) {
    return this.http.put(`${this.baseUrl}/me/update`, userData);
  }

  getAllUsers() {
    return this.http.get(`${this.baseUrl}/admin/users`);
  }

  getSingleUser(userId: string) {
    return this.http.get(`${this.baseUrl}/admin/user/${userId}`);
  }

  updateUserRole(userId: string, newRole: string) {
    return this.http.put(`${this.baseUrl}/admin/user/${userId}`, { newRole });
  }

  deleteUser(userId: string) {
    return this.http.delete(`${this.baseUrl}/admin/user/${userId}`);
  }
}
