import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {AuthService} from '../../../../services/auth.service';
import {UserService} from '../../../../services/user.service';
import {CommonModule} from '@angular/common';
import {NavbarComponent} from '../../../components/navbar/navbar.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import * as jwt_decode from 'jwt-decode';
import {MatCardModule} from '@angular/material/card';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,

  ],
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: any = null; // Thông tin người dùng

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('auth-token');
    if (!token) {
      console.error('Không tìm thấy token');
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log('Payload giải mã:', payload);

      const userId = payload?.sub || payload?.id || payload?.userId;
      if (!userId) {
        console.error('Không tìm thấy userId trong token');
        return;
      }

      this.userService.getUserById(userId).subscribe({
        next: (res) => {
          this.user = res;
        },
        error: (err) => {
          console.error('Lỗi khi lấy thông tin người dùng:', err);
        },
      });
    } catch (error) {
      console.error('Lỗi giải mã token:', error);
    }

  }
  getImageUrl(): string {
    if (this.user?.image_url?.startsWith('/assets')) {
      return this.user.image_url;
    }

    // Trường hợp ảnh từ backend (ví dụ trả về `/uploads/xyz.png`)
    return `http://localhost:3000${this.user.image_url}`;
  }

}
