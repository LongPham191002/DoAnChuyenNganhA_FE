import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CART_API as CART } from "@src/consts/api";
import { CartItem } from "@src/models/cart-item.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class CartService {
    constructor(private http: HttpClient) {}

    addCart(item: CartItem): Observable<any> {
        return this.http.post<any>(CART.ADD_TO_CART, item);
    }

    removeCart(payload: any): Observable<any> {
        return this.http.delete<any>(CART.UPDATE_CART, );
    }
}