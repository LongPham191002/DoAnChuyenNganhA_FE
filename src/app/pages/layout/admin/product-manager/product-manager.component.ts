import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../../../../services/product.service';
import {MatDialog} from '@angular/material/dialog';
import {ProductFormDialogComponent} from './product-form-dialog/product-form-dialog.component';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {Product} from '../../../../../models/product.model';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-manager',
  imports: [CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,],
  templateUrl: './product-manager.component.html',
  styleUrl: './product-manager.component.scss'
})
export class ProductManagerComponent implements OnInit {
  displayedColumns: string[] = [
    'product_id', 'product_name', 'description', 'size', 'color', 'price',
    'status', 'product_quantity', 'category_id', 'update_date', 'actions'
  ];
  dataSource = new MatTableDataSource<Product>();

  constructor(
    private productService: ProductService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (data) => {
        console.log('📦 Danh sách sản phẩm nhận được:', data);
        this.dataSource.data = data;
      },
      error: () => this.snackBar.open('Lỗi khi tải sản phẩm', 'Đóng', { duration: 3000 })
    });
  }

  // Xử lý các hành động như xóa, thêm, sửa sản phẩm
  deleteProduct(id: number) {
    console.log('ID nhận được để xoá:', id); // nên in ra số
    if (isNaN(id)) {
      alert('ID không hợp lệ!'); // chỉ để test
      return;
    }

    if (confirm('Bạn có chắc chắn muốn xoá sản phẩm này không?')) {
      this.productService.delete(id).subscribe({
        next: () => {
          this.snackBar.open('Đã xoá sản phẩm', 'Đóng', { duration: 3000 });
          this.loadProducts();
        },
        error: () => this.snackBar.open('Lỗi xoá sản phẩm', 'Đóng', { duration: 3000 }),
      });
    }
  }

  addProduct() {
    const dialogRef = this.dialog.open(ProductFormDialogComponent, {
      width: '600px',
      data: null,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productService.create(result).subscribe(() => {
          this.snackBar.open('Đã thêm sản phẩm', 'Đóng', { duration: 3000 });
          this.loadProducts();
        });
      }
    });
  }

  editProduct(product: Product) {
    const dialogRef = this.dialog.open(ProductFormDialogComponent, {
      width: '600px',
      data: product,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productService.update(product.product_id, result).subscribe(() => {
          this.snackBar.open('Đã cập nhật sản phẩm', 'Đóng', { duration: 3000 });
          this.loadProducts();
        });
      }
    });
  }
}
