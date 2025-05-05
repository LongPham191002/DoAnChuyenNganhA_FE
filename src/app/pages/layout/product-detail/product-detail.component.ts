import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})

export class ProductDetailComponent  {
  private route = inject(ActivatedRoute);

  product: any;
  quantity = 1;
  relatedProducts: any[] = [];

  selectedImage: string | null = null;
  selectedColor: string = 'black';
  selectedSize: string = 'M';
  showSizeGuide: boolean = false;


  toggleSizeGuide(event: Event) {
    event.preventDefault();
    this.showSizeGuide = !this.showSizeGuide;
  }

  addToCart() {
    alert(`Đã thêm ${this.quantity} sản phẩm (${this.selectedColor}, ${this.selectedSize}) vào giỏ hàng`);
  }
}
