// checkout.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PdfExportService } from '../../../services/pdf-export.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent {
  checkoutForm: FormGroup;
  paymentMethod: string = 'direct bank transfer';
  orderDetails = {
    items: [{ product: 'Cocktail Yellow dress', total: '$59.90' }],
    subtotal: '$59.90',
    shipping: 'Free',
    total: '$59.90',
  };

  constructor(
    private fb: FormBuilder,
    private pdfExportService: PdfExportService
  ) {
    this.checkoutForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      company: [''],
      country: ['usa', Validators.required],
      address1: ['', Validators.required],
      address2: [''],
      postcode: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onPaymentMethodChange(method: string): void {
    this.paymentMethod = method;
  }

  // In your component
  exportToPDF() {
    this.pdfExportService.exportCheckoutToPDF(
      this.formData,
      this.orderDetails,
      this.paymentMethod
    );
  }
  formData(
    formData: any,
    orderDetails: {
      items: { product: string; total: string }[];
      subtotal: string;
      shipping: string;
      total: string;
    },
    paymentMethod: string
  ) {
    throw new Error('Method not implemented.');
  }
}
