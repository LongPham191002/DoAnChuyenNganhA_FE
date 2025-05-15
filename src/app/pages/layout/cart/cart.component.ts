import { Component, OnInit } from '@angular/core';
import { CartItem } from '@src/models/cart-item.model';
import { CartService } from '@src/services/cart.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });
  }

  incrementQuantity(item: CartItem) {
    this.cartService.incrementQuantity(item.productId, item.size, item.color);
  }

  decrementQuantity(item: CartItem) {
    this.cartService.decrementQuantity(item.productId, item.size, item.color);
  }

  removeItem(item: CartItem) {
    this.cartService.removeItem(item.productId, item.size, item.color);
  }

  clearCart() {
    this.cartService.clearCart();
  }

  getTotal(): number {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  formatPrice(price: number): string {
    return price.toFixed(2);
  }

  getItemTotal(item: CartItem): string {
    return this.formatPrice(item.price * item.quantity);
  }

  getFormattedTotal(): string {
    return this.formatPrice(this.getTotal());
  }

  proceedToCheckout() {
    if (this.cartItems.length > 0) {
      const cartId = this.cartService.getCartId();
      this.router.navigate(['/checkout', cartId]);
    }
  }
}
