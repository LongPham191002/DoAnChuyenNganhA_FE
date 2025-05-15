import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from 'src/services/cart.service';
import { CartItem } from 'src/models/cart-item.model';

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

interface OrderItem {
  productName: string;
  size: string;
  color: string;
  quantity: number;
  price: number;
}

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class InvoiceComponent implements OnInit {
  currentDate = new Date();
  invoiceNumber = 'INV-' + Math.floor(Math.random() * 1000000);
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
  orderItems: OrderItem[] = [];
  subtotal = 0;
  shipping = 0;
  total = 0;
  paymentMethod = '';

  constructor(private cartService: CartService) {}

  ngOnInit() {
    // Get customer info from localStorage or service
    const savedCustomerInfo = localStorage.getItem('customerInfo');
    if (savedCustomerInfo) {
      this.customerInfo = JSON.parse(savedCustomerInfo);
    }

    // Get order items from cart service
    this.cartService.cartItems$.subscribe(items => {
      this.orderItems = items.map(item => ({
        productName: item.name,
        size: item.size || 'N/A',
        color: item.color || 'N/A',
        quantity: item.quantity,
        price: item.price
      }));
      this.calculateTotals();
    });
    
    // Get payment method from localStorage or service
    this.paymentMethod = localStorage.getItem('paymentMethod') || 'Credit Card';
  }

  calculateTotals() {
    this.subtotal = this.orderItems.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
    
    this.shipping = 0; // Free shipping
    this.total = this.subtotal + this.shipping;
  }

  printInvoice() {
    const printContent = document.getElementById('invoice-content');
    if (printContent) {
      const originalContents = document.body.innerHTML;
      const printContents = printContent.innerHTML;
      
      document.body.innerHTML = `
        <html>
          <head>
            <title>Invoice</title>
            <style>
              body { font-family: Arial, sans-serif; }
              .invoice-container { max-width: 800px; margin: 0 auto; padding: 20px; }
              .invoice-header { display: flex; justify-content: space-between; margin-bottom: 20px; }
              .customer-info { margin-bottom: 20px; }
              table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
              th, td { padding: 10px; border: 1px solid #ddd; text-align: left; }
              th { background-color: #f8f9fa; }
              .invoice-footer { text-align: center; margin-top: 20px; }
            </style>
          </head>
          <body>
            ${printContents}
          </body>
        </html>
      `;
      
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload();
    }
  }

  downloadPDF() {
    // Implement PDF download functionality
    // You can use libraries like jsPDF or html2pdf
    console.log('Download PDF functionality to be implemented');
  }
}
