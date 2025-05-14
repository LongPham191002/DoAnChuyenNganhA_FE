import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavbarComponent} from "../../components/navbar/navbar.component";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-login',
    imports: [
        NavbarComponent,
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
    ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements  OnDestroy {
  loginForm: FormGroup;
  showDropdown: boolean = false;

  isLoadingSignIn = false;

  subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    // private store: Store<{ auth: AuthState }>,
    private router: Router,
    private _matSnackBar: MatSnackBar,
    private authService: AuthService,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  ngOnInit(): void {
    const sub = this.authService.isAuthenticated().subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        const redirectUrl = localStorage.getItem('redirectAfterLogin');
        if (redirectUrl) {
          localStorage.removeItem('redirectAfterLogin');
          this.router.navigateByUrl(redirectUrl);
        } else {
          this.router.navigate(['/main']);
        }
      }
    });
    this.subscriptions.push(sub);
  }


  ngOnDestroy(): void {
    console.log('LoginComponent destroyed');
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  signInWithStaticUser(): void {
    if (this.loginForm.invalid) {
      this._matSnackBar.open('Thông tin đăng nhập không hợp lệ', 'Đóng', { duration: 3000 });
      return;
    }

    console.log('Submitting login form');
    this.isLoadingSignIn = true;
    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe(
      (response) => {
        console.log('Login response', response);
        this.isLoadingSignIn = false;

        // ✅ Lưu token vào localStorage
        localStorage.setItem('auth-token', response.access_token);
        const role = response.user?.role;
        if (role === 'Admin') {
          this.router.navigate(['/admin']);
          this._matSnackBar.open('Đăng nhập thành công!', 'Đóng', { duration: 3000 });

        } else {
          this.router.navigate(['/profile']);
          this._matSnackBar.open('Đăng nhập thành công!', 'Đóng', { duration: 3000 });

        }



        // // ✅ Chuyển tới trang profile để hiển thị thông tin người dùng
        // this.router.navigate(['/profile']);
      },
      (error) => {
        console.log('Login failed, error:', error);
        this.isLoadingSignIn = false;

        if (error.status === 500) {
          this._matSnackBar.open('Lỗi phía server! Vui lòng thử lại sau.', 'Đóng', { duration: 5000 });
        } else {
          this._matSnackBar.open('Có lỗi xảy ra! Vui lòng kiểm tra lại thông tin.', 'Đóng', { duration: 5000 });
        }
      }
    );
  }

  navigate(path: string): void {
    this.router.navigate([path]);
    this.showDropdown = false;
  }

  signInWithGoogle(): void {
    this._matSnackBar.open('Tính năng đang phát triển', 'Đóng', { duration: 3000 });
  }
}
