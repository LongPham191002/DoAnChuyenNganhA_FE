import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
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
    FormsModule

  ],
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: any = null; // Thông tin người dùng
  originalUser: any = null;
  isEditing = false;
  selectedImageFile: File | null = null;
  orders = [
    { id: 'ORD001', date: '2025-05-10', total: 1500000, status: 'completed' },
    { id: 'ORD002', date: '2025-05-11', total: 750000, status: 'pending' },
    { id: 'ORD003', date: '2025-05-12', total: 1200000, status: 'cancelled' },
  ];

  constructor(private userService: UserService, private fb: FormBuilder,private snackBar: MatSnackBar) {}

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

  toggleEdit(): void {
    this.isEditing = !this.isEditing;

    if (!this.isEditing) {
      this.user = { ...this.originalUser }; // hủy chỉnh sửa
    }
  }

  saveChanges(): void {
    this.userService.updateUser(this.user).subscribe({
      next: (res) => {
        this.user = res;
        this.originalUser = { ...res };
        this.isEditing = false;
        this.snackBar.open('Cập nhật thành công', 'Đóng', { duration: 3000 });
      },
      error: (err) => {
        console.error(err);
        this.snackBar.open('Lỗi khi cập nhật', 'Đóng', { duration: 3000 });
      },
    });
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedImageFile = input.files[0];

      // Hiển thị ảnh preview tạm
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.user.image_url = e.target.result;
      };
      reader.readAsDataURL(this.selectedImageFile);
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
