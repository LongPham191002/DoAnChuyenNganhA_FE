import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Category } from '@src/models/category.model';
import { HttpClient } from '@angular/common/http';
import { environment } from './../environments/environment';

@Injectable({
    providedIn: 'root',
})

export class CategoryService {
    constructor(
        private http: HttpClient,
    ) {}

    getCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(`${environment.apiUrl}/category`);
    }

    getCategoryById(id: number): Observable<Category | undefined> {
        return this.http.get<Category>(`${environment.apiUrl}/category/${id}`);
    }
}
