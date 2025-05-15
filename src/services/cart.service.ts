import { Injectable } from "@angular/core";
import { CartItem } from "@src/models/cart-item.model";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();
  private readonly CART_STORAGE_KEY = 'cart';
  private readonly CART_ID_KEY = 'cart_id';

  constructor() {
    this.loadCartFromStorage();
  }

  private loadCartFromStorage() {
    try {
      const savedCart = localStorage.getItem(this.CART_STORAGE_KEY);
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        if (Array.isArray(parsedCart)) {
          this.cartItemsSubject.next(parsedCart);
        } else {
          this.clearCart();
        }
      }
    } catch (error) {
      console.error('Error loading cart from storage:', error);
      this.clearCart();
    }
  }

  private saveCartToStorage(items: CartItem[]) {
    try {
      localStorage.setItem(this.CART_STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error('Error saving cart to storage:', error);
    }
  }

  private generateCartId(): string {
    return 'cart_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  getCartId(): string {
    let cartId = localStorage.getItem(this.CART_ID_KEY);
    if (!cartId) {
      cartId = this.generateCartId();
      localStorage.setItem(this.CART_ID_KEY, cartId);
    }
    return cartId;
  }

  getItems(): CartItem[] {
    return this.cartItemsSubject.getValue();
  }

  addToCart(item: CartItem) {
    const items = this.getItems();
    const existingItem = items.find(i => 
      i.productId === item.productId && 
      i.size === item.size && 
      i.color === item.color
    );

    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      items.push(item);
    }

    this.cartItemsSubject.next(items);
    this.saveCartToStorage(items);
  }

  removeItem(productId: number, size?: string, color?: string) {
    const items = this.getItems().filter(item => 
      !(item.productId === productId && 
        item.size === size && 
        item.color === color)
    );
    this.cartItemsSubject.next(items);
    this.saveCartToStorage(items);
  }

  clearCart() {
    this.cartItemsSubject.next([]);
    localStorage.removeItem(this.CART_STORAGE_KEY);
    localStorage.removeItem(this.CART_ID_KEY);
  }

  updateItemQuantity(productId: number, quantity: number, increment: boolean = false) {
    const items = this.getItems();
    const item = items.find(i => i.productId === productId);
    if (item) {
      if (increment) {
        item.quantity = Math.min(item.quantity + 1, 99);
      } else {
        item.quantity = Math.min(Math.max(quantity, 1), 99);
      }
      this.cartItemsSubject.next(items);
      this.saveCartToStorage(items);
    }
  }

  incrementQuantity(productId: number, size?: string, color?: string) {
    const items = this.getItems();
    const item = items.find(i => 
      i.productId === productId && 
      i.size === size && 
      i.color === color
    );
    
    if (item) {
      item.quantity = Math.min(item.quantity + 1, 99);
      this.cartItemsSubject.next(items);
      this.saveCartToStorage(items);
    }
  }

  decrementQuantity(productId: number, size?: string, color?: string) {
    const items = this.getItems();
    const item = items.find(i => 
      i.productId === productId && 
      i.size === size && 
      i.color === color
    );
    
    if (item && item.quantity > 1) {
      item.quantity--;
      this.cartItemsSubject.next(items);
      this.saveCartToStorage(items);
    }
  }
}
