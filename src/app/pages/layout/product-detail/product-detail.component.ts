import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '@src/services/product.service';

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

export class ProductDetailComponent implements OnInit {
  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);

  product: any;
  quantity = 1;
  relatedProducts: any[] = [];

  selectedImage: string | null = null;
  selectedColor: string = 'black';
  selectedSize: string = 'M';
  showSizeGuide: boolean = false;


  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id') || 1);

    this.productService.getProduct(id).subscribe(data => {
      this.product = data;
      this.selectedImage = this.product.thumbnail;

      this.selectedColor = data.color?.[0] || '';
      this.selectedSize = data.size?.[0] || '';
    });

    this.productService.getRelatedProducts().subscribe(all => {
      this.relatedProducts = all.filter(p => p.category === this.product?.category && p.id !== id);
    });
  }

  toggleSizeGuide(event: Event) {
    event.preventDefault();
    this.showSizeGuide = !this.showSizeGuide;
  }

  addToCart() {
    alert(`Đã thêm ${this.quantity} sản phẩm (${this.selectedColor}, ${this.selectedSize}) vào giỏ hàng`);
  }
}
