import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Order } from '../../models/order';
import { Product } from '../../models/product';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  totalSales: number = 0;
  totalOrders: number = 0;
  totalProducts: number = 0;
  totalCustomers: number = 0;
  recentOrders: Order[] = [];
  topProducts: Product[] = [];
  salesData: any[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.dataService.getDashboardData().subscribe((data) => {
      this.totalSales = data.totalSales;
      this.totalOrders = data.totalOrders;
      this.totalProducts = data.totalProducts;
      this.totalCustomers = data.totalCustomers;
      this.recentOrders = data.recentOrders;
      this.topProducts = data.topProducts;
      this.salesData = data.salesData;
    });
  }
}
