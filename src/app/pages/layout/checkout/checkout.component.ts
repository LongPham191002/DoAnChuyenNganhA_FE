import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface CustomerInfo {
  firstName: string;
  lastName: string;
  company: string;
  address: string;
  city: string;
  state: string;
  postcode: string;
  phone: string;
  email: string;
}

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class CheckoutComponent {
  customerInfo: CustomerInfo = {
    firstName: '',
    lastName: '',
    company: '',
    address: '',
    city: '',
    state: '',
    postcode: '',
    phone: '',
    email: ''
  };

  constructor(private router: Router) {}

  onSubmit() {
    // Save customer info to localStorage
    localStorage.setItem('customerInfo', JSON.stringify(this.customerInfo));
    
    // Save payment method
    const paymentMethod = document.querySelector('input[name="payment"]:checked')?.getAttribute('value') || 'Credit Card';
    localStorage.setItem('paymentMethod', paymentMethod);

    // Navigate to invoice page
    this.router.navigate(['/invoice']);
  }

  printInvoice() {
    // Navigate to invoice page
    this.router.navigate(['/invoice']);
  }
}
