import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ProductService} from '../../../../services/product.service';
import {Product} from '../../../../models/product.model';
import {CartService} from '../../../../services/cart.service';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';


@Component({
  selector: 'app-product-detail',
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;
  quantity: number = 1; // Số lượng sản phẩm mặc định khi thêm vào giỏ hàng

  constructor(
    private productService: ProductService,
    private cartService: CartService, // Khai báo CartService
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Lấy id từ URL
    const productId = this.route.snapshot.paramMap.get('id')!;

    // Lấy thông tin sản phẩm từ service ProductService
    this.productService.getProductById(productId).subscribe(
      (product) => {
        this.product = product; // Gán dữ liệu sản phẩm nhận được
      },
      (error) => {
        console.error('Lỗi khi lấy thông tin sản phẩm:', error);
      }
    );
  }

  // Hàm xử lý sự kiện thêm vào giỏ hàng
  // addToCart(product: Product): void {
  //   const cartItem = {
  //     product: product,
  //     quantity: this.quantity // Số lượng sản phẩm chọn
  //   };
  //
  //   this.cartService.addToCart(cartItem); // Gọi CartService để thêm sản phẩm vào giỏ hàng
  //   console.log('Sản phẩm đã được thêm vào giỏ hàng:', cartItem);
  // }

  // Hàm tăng số lượng sản phẩm
  increaseQty(): void {
    if (this.quantity < 12) {
      this.quantity++;
    }
  }

  // Hàm giảm số lượng sản phẩm
  decreaseQty(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  protected readonly Number = Number;
}
