import { Component ,OnDestroy, OnInit } from '@angular/core';
import {NavbarComponent} from "../../components/navbar/navbar.component";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-signup',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NavbarComponent,
    MatInputModule,
    MatButtonModule,],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signupForm: FormGroup;
  isLoadingSignIn = false;
  subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _matSnackBar: MatSnackBar,
    private authService: AuthService
  ) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      numberPhone: ['', [Validators.required, Validators.pattern(/^[0-9]{10,11}$/)]],
      name: ['', [Validators.required]],
      address: ['', [Validators.required, Validators.minLength(5)]], // thêm dòng này
      // Bạn có thể thêm confirmPassword nếu cần xác thực 2 lần mật khẩu
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  signInWithGoogle(): void {
    // Xử lý Google OAuth nếu có
    this._matSnackBar.open('Chức năng đang phát triển', 'Đóng', { duration: 3000 });
  }

  onSubmit(): void {
    if (this.signupForm.invalid) {
      this._matSnackBar.open('Vui lòng điền đúng và đầy đủ thông tin!', 'Đóng', {
        duration: 3000,
      });
      return;
    }

    const { name, email, password, numberPhone, address } = this.signupForm.value;

    this.isLoadingSignIn = true;

    this.authService.signup({ name, email, password, phone: numberPhone, address }).subscribe({
      next: () => {
        this._matSnackBar.open('Đăng ký thành công! Vui lòng đăng nhập.', 'Đóng', {
          duration: 3000,
        });
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this._matSnackBar.open(err?.error?.message || 'Đăng ký thất bại!', 'Đóng', {
          duration: 4000,
        });
        this.isLoadingSignIn = false;
      },
      complete: () => {
        this.isLoadingSignIn = false;
      },
    });
  }

  navigate(path: string): void {
    this.router.navigate([path]);
  }


}
