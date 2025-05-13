import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
// import { Order } from '../models/order';
// import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor() {}

  getDashboardData(): Observable<any> {
    // Trong thực tế, bạn sẽ gọi API ở đây
    // Đây là dữ liệu mẫu
    const data = {
      totalSales: 12543.65,
      totalOrders: 342,
      totalProducts: 156,
      totalCustomers: 278,
      recentOrders: this.getRecentOrders(),
      topProducts: this.getTopProducts(),
      salesData: [{ data: [65, 59, 80, 81, 56, 55, 40], label: 'Sales' }],
    };

    return of(data);
  }

  private getRecentOrders(): Order[] {
    return [
      {
        id: 1,
        customer: 'John Doe',
        date: new Date(),
        amount: 120.5,
        status: 'Completed',
      },
      {
        id: 2,
        customer: 'Jane Smith',
        date: new Date(),
        amount: 85.2,
        status: 'Processing',
      },
      {
        id: 3,
        customer: 'Robert Johnson',
        date: new Date(),
        amount: 220.0,
        status: 'Completed',
      },
      {
        id: 4,
        customer: 'Emily Davis',
        date: new Date(),
        amount: 63.75,
        status: 'Pending',
      },
      {
        id: 5,
        customer: 'Michael Wilson',
        date: new Date(),
        amount: 154.3,
        status: 'Completed',
      },
    ];
  }

  private getTopProducts(): Product[] {
    return [
      {
        id: 1,
        name: 'T-Shirt Basic',
        price: 19.99,
        sales: 142,
        image: 'assets/images/tshirt.jpg',
      },
      {
        id: 2,
        name: 'Jeans Slim Fit',
        price: 49.99,
        sales: 98,
        image: 'assets/images/jeans.jpg',
      },
      {
        id: 3,
        name: 'Hoodie Black',
        price: 39.99,
        sales: 76,
        image: 'assets/images/hoodie.jpg',
      },
      {
        id: 4,
        name: 'Sneakers White',
        price: 59.99,
        sales: 65,
        image: 'assets/images/sneakers.jpg',
      },
      {
        id: 5,
        name: 'Cap Red',
        price: 14.99,
        sales: 53,
        image: 'assets/images/cap.jpg',
      },
    ];
  }
}
