// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import {Router} from '@angular/router';
import firebase from 'firebase/compat/app';
import { Auth, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth'; // ✅ Modular SDK


const API_URL = 'http://localhost:3000/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authStatus = new BehaviorSubject<boolean>(this.hasToken());
  private currentUserSubject = new BehaviorSubject<any>(this.getUserFromLocalStorage());
  public currentUser = this.currentUserSubject.asObservable();

  constructor(private auth: Auth,private http: HttpClient, private router: Router) {}

  // Đăng ký người dùng
  signup(data: { name: string; email: string; password: string; phone?: string; address?: string }): Observable<any> {
    return this.http.post(`${API_URL}/register`, data).pipe(
      tap((res: any) => {
        this.handleAuthSuccess(res);
      }),
      catchError(this.handleError),
    );
  }

  // Đăng nhập người dùng
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${API_URL}/login`, { email, password }).pipe(
      tap((res: any) => {
        this.handleAuthSuccess(res);
      }),
      catchError(this.handleError),
    );
  }

  loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider).then(result => {
      return result.user.getIdToken().then(token => {
        return this.http.post(`${API_URL}/firebase-login`, { token }).toPromise();
      });
    });
  }

  // Đăng xuất
  logout() {
    localStorage.removeItem('access_token');
    this.authStatus.next(false);
    this.currentUserSubject.next(null);
  }

  // Kiểm tra xem người dùng đã đăng nhập chưa
  isAuthenticated(): Observable<boolean> {
    return this.authStatus.asObservable();
  }

  // Lưu thông tin người dùng và token vào localStorage
  private handleAuthSuccess(res: { access_token: string; user: any }) {
    if (res.access_token) {
      localStorage.setItem('access_token', res.access_token);
      localStorage.setItem('user', JSON.stringify(res.user));  // Lưu thông tin người dùng vào localStorage
      this.authStatus.next(true);
      this.currentUserSubject.next(res.user);  // Cập nhật thông tin người dùng


    }
  }

  // Lấy thông tin người dùng từ localStorage
  getUserFromLocalStorage() {
    const userJson = localStorage.getItem('user');
    if (!userJson) {
      return null;
    }

    try {
      return JSON.parse(userJson);
    } catch (e) {
      console.error('Error parsing user from localStorage', e);
      return null;
    }
  }


  // auth.service.ts
  public updateCurrentUser(user: any) {
    this.currentUserSubject.next(user);
    localStorage.setItem('user', JSON.stringify(user));
  }



  // Kiểm tra token trong localStorage
  private hasToken(): boolean {
    return !!localStorage.getItem('access_token');
  }

  // Xử lý lỗi
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Có lỗi xảy ra!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Lỗi phía client: ${error.error.message}`;
    } else {
      errorMessage = `Lỗi phía server: ${error.message}`;
    }
    return throwError(() => errorMessage);
  }
}
