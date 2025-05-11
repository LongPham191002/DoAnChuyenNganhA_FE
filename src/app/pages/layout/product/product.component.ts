import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../services/product.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product',
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {
  groupedProducts: any[][] = [];
  showDropdown: boolean = false;


  constructor(private productService: ProductService,     private router: Router,
  ) {

  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.groupedProducts = this.groupIntoRows(data, 3);
        // Chia thành các nhóm 3 sản phẩm
        console.log(this.groupedProducts);
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      }
    });
  }

  private groupIntoRows(data: any[], count: number): any[][] {
    const result: any[][] = [];
    for (let i = 0; i < data.length; i += count) {
      result.push(data.slice(i, i + count));  // Chia mảng thành các nhóm có 3 sản phẩm
    }
    return result;
  }

  // trackByIndex: Hàm này sẽ giúp Angular nhận diện index của mỗi nhóm
  trackByIndex(index: number): number {
    return index;
  }

  // trackByProductId: Hàm này giúp Angular nhận diện mỗi sản phẩm bằng cách sử dụng `product.id`
  trackByProductId(index: number, product: any): number {
    return product.product_id;  // Giả sử `product_id` là thuộc tính duy nhất của sản phẩm
  }

  navigateToProduct(product: any) {
    if (product && product.product_id) {
      this.router.navigate(['/product-detail', product.product_id]);
    } else {
      console.error('Product or product_id is missing', product);
    }
  }

}
