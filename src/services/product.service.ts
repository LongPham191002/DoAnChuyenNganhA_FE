import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from '@src/consts/api';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = BASE_URL + '/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getProduct(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  addProduct(product: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, product);
  }

  getRelatedProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + '?_limit=5');
  }
}
