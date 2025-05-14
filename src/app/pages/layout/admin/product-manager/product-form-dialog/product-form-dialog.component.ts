import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ProductService} from '../../../../../../services/product.service';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {Product} from '../../../../../../models/product.model';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-product-form-dialog',
  imports: [CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,],
  templateUrl: './product-form-dialog.component.html',
  styleUrl: './product-form-dialog.component.scss'
})
export class ProductFormDialogComponent {
  productForm: FormGroup;
  isEditMode: boolean;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ProductFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product | null
  ) {
    this.isEditMode = !!data;

    this.productForm = this.fb.group({
      product_name: [data?.product_name || '', Validators.required],
      description: [data?.description || ''],
      size: [data?.size || '', Validators.required],
      color: [data?.color || '', Validators.required],
      image_url: [data?.image_url || '', Validators.required],
      status: [data?.status || 'In Stock'],
      product_quantity: [data?.product_quantity || 0, [Validators.required, Validators.min(0)]],
      price: [data?.price || 0, [Validators.required, Validators.min(0)]],
      update_date: [data?.update_date || new Date().toISOString()],
      category_id: [data?.category_id || 1, Validators.required],
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      const productData = {
        ...this.data,
        ...this.productForm.value,
        update_date: new Date().toISOString(),
      };
      this.dialogRef.close(productData);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
