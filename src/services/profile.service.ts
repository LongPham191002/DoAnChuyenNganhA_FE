import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PROFILE_API as PROFILE } from "@src/consts/api";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class ProfileService {
    constructor(private http: HttpClient) {}

    getProfile(): Observable<any> {
        return this.http.get<any>(PROFILE.GET_PROFILE);
    }

    addFavorite(product: any): Observable<any> {
        return this.http.post<any>(PROFILE.ADD_FAVORITE, product);
    }

    removeFavorite(product: any): Observable<any> {
        return this.http.delete<any>(PROFILE.REMOVE_FAVORITE, product);
    }
}