import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../services/product.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product',
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {
  products: any[] = [];

  constructor(private productService: ProductService) {} // Inject ProductService

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        console.log('Products from API:', data);
        this.products = data;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      }
    });
  }
}
