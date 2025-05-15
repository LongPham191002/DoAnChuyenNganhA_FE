import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CartService } from '@src/services/cart.service';
import { ProductService } from '@src/services/product.service';
import { CartItem } from '@src/models/cart-item.model';
import { Product } from '@src/models/product.model';
import { NgbModule, NgbCarouselModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    NgbCarouselModule,
    RouterModule,
    NgbToastModule
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;
  quantity: number = 1;
  selectedSize: string = '';
  selectedColor: string = '';
  activeImage: string = '';
  showToast: boolean = false;
  toastMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const productId = +params['id'];
      this.loadProduct(productId);
    });
  }

  loadProduct(productId: number) {
    this.productService.getProductById(productId).subscribe(product => {
      if (product) {
        this.product = product;
        this.activeImage = product.image_url;
        if (product.size && product.size.length > 0) {
          this.selectedSize = product.size[0];
        }
        if (product.color && product.color.length > 0) {
          this.selectedColor = product.color[0];
        }
      } else {
        this.router.navigate(['/products']);
      }
    });
  }

  selectImage(image: string) {
    this.activeImage = image;
  }

  selectSize(size: string) {
    this.selectedSize = size;
  }

  selectColor(color: string) {
    this.selectedColor = color;
  }

  increment() {
    if (this.quantity < 99) {
      this.quantity++;
      this.updateQuantity();
    }
  }

  decrement() {
    if (this.quantity > 1) {
      this.quantity--;
      this.updateQuantity();
    }
  }

  updateQuantity() {
    // Update the input value
    const input = document.getElementById('qty') as HTMLInputElement;
    if (input) {
      input.value = this.quantity.toString();
    }
  }

  onQuantityChange(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = parseInt(input.value);
    
    // Validate the input
    if (isNaN(value) || value < 1) {
      value = 1;
    } else if (value > 99) {
      value = 99;
    }
    
    this.quantity = value;
    input.value = value.toString();
  }

  addToCart() {
    if (!this.product) return;

    // Validate size selection if product has sizes
    if (this.product.size && this.product.size.length > 0 && !this.selectedSize) {
      this.showToastMessage('Please select a size');
      return;
    }

    // Validate color selection if product has colors
    if (this.product.color && this.product.color.length > 0 && !this.selectedColor) {
      this.showToastMessage('Please select a color');
      return;
    }

    const cartItem: CartItem = {
      productId: this.product.product_id,
      name: this.product.product_name,
      price: this.product.price,
      quantity: this.quantity,
      imageUrl: this.product.image_url,
      size: this.selectedSize,
      color: this.selectedColor
    };

    this.cartService.addToCart(cartItem);
    this.showToastMessage('Product added to cart successfully!');
    this.quantity = 1;
    this.updateQuantity();
  }

  private showToastMessage(message: string) {
    this.toastMessage = message;
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }
}
