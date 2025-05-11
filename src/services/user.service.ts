import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private API_URL = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  // Lấy thông tin người dùng theo ID
  getUserById(id: number): Observable<any> {
    const token = localStorage.getItem('auth-token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get(`${this.API_URL}/${id}`, { headers });
  }


  // Cập nhật thông tin người dùng
  updateUser(user: any): Observable<any> {
    return this.http.put(`${this.API_URL}/${user.id}`, user);
  }
}
