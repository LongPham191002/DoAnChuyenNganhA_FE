import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '@src/models/product.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '@src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(
    private http: HttpClient
  ) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.apiUrl}/products`);
  }

  getProductById(id: number): Observable<Product | undefined> {
    return this.http.get<Product>(`${environment.apiUrl}/products/${id}`);
  }

  // TODO: provide api search to get products by category //
  getProductsByCategory(categoryId: number): Observable<Product[]> {
    return this.getProducts().pipe(
      map(products => products.filter(product => product.category_id === categoryId))
    );
  }

  // TODO: provide api search to get recommended products //
  getRecommendedProducts(): Observable<Product[]> {
    return this.getProducts().pipe(
      map(products => products.sort(() => 0.5 - Math.random()).slice(0, 3))
    )
  }
}
