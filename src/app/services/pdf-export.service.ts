// pdf-export.service.ts
import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';

@Injectable({
  providedIn: 'root',
})
export class PdfExportService {
  private doc: jsPDF;

  constructor() {
    this.doc = new jsPDF();
  }

  exportCheckoutToPDF(
    formData: any,
    orderDetails: any,
    paymentMethod: string
  ): void {
    this.addHeader();
    this.addBillingAddress(formData);
    this.addOrderDetails(orderDetails);
    this.addPaymentMethod(paymentMethod);
    this.savePDF();
  }

  private addHeader(): void {
    this.doc.setFontSize(20);
    this.doc.setTextColor(40, 40, 40);
    this.doc.text('Order Summary', 105, 20, { align: 'center' });
    this.doc.setLineWidth(0.5);
    this.doc.line(20, 25, 190, 25);
    this.doc.setFontSize(12);
  }

  private addBillingAddress(formData: any): void {
    this.doc.setFontSize(14);
    this.doc.text('Billing Address', 20, 35);
    this.doc.setFontSize(10);

    let yPosition = 45;
    this.doc.text(
      `Name: ${formData.firstName} ${formData.lastName}`,
      20,
      yPosition
    );
    yPosition += 7;

    if (formData.company) {
      this.doc.text(`Company: ${formData.company}`, 20, yPosition);
      yPosition += 7;
    }

    this.doc.text(
      `Country: ${this.getCountryName(formData.country)}`,
      20,
      yPosition
    );
    yPosition += 7;

    this.doc.text(`Address: ${formData.address1}`, 20, yPosition);
    yPosition += 7;

    if (formData.address2) {
      this.doc.text(`Address 2: ${formData.address2}`, 20, yPosition);
      yPosition += 7;
    }

    this.doc.text(`Postcode: ${formData.postcode}`, 20, yPosition);
    yPosition += 7;
    this.doc.text(`City: ${formData.city}`, 20, yPosition);
    yPosition += 7;
    this.doc.text(`Province: ${formData.state}`, 20, yPosition);
    yPosition += 7;
    this.doc.text(`Phone: ${formData.phone}`, 20, yPosition);
    yPosition += 7;
    this.doc.text(`Email: ${formData.email}`, 20, yPosition);
    yPosition += 10;
  }

  private addOrderDetails(orderDetails: any): void {
    this.doc.setFontSize(14);
    this.doc.text('Order Details', 20, 130);
    this.doc.setFontSize(10);

    let yPosition = 140;

    // Add table header
    this.doc.setFont('', 'bold');
    this.doc.text('Product', 20, yPosition);
    this.doc.text('Total', 180, yPosition, { align: 'right' });
    this.doc.setFont('', 'normal');
    yPosition += 7;

    // Add order items
    orderDetails.items.forEach((item: any) => {
      this.doc.text(item.product, 20, yPosition);
      this.doc.text(item.total, 180, yPosition, { align: 'right' });
      yPosition += 7;
    });

    yPosition += 3;
    this.doc.line(20, yPosition, 190, yPosition);
    yPosition += 7;

    // Add subtotal, shipping, and total
    this.doc.text('Subtotal', 20, yPosition);
    this.doc.text(orderDetails.subtotal, 180, yPosition, { align: 'right' });
    yPosition += 7;

    this.doc.text('Shipping', 20, yPosition);
    this.doc.text(orderDetails.shipping, 180, yPosition, { align: 'right' });
    yPosition += 7;

    this.doc.setFont('', 'bold');
    this.doc.text('Total', 20, yPosition);
    this.doc.text(orderDetails.total, 180, yPosition, { align: 'right' });
    this.doc.setFont('', 'normal');
  }

  private addPaymentMethod(paymentMethod: string): void {
    this.doc.setFontSize(14);
    this.doc.text('Payment Method', 20, 180);
    this.doc.setFontSize(10);
    this.doc.text(paymentMethod, 20, 190);
  }

  private savePDF(): void {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    this.doc.save(`order-summary-${timestamp}.pdf`);
  }

  private getCountryName(code: string): string {
    const countries: Record<string, string> = {
      usa: 'United States',
      uk: 'United Kingdom',
      ger: 'Germany',
      fra: 'France',
      ind: 'India',
      aus: 'Australia',
      bra: 'Brazil',
      cana: 'Canada',
    };
    return countries[code] || code;
  }
}
