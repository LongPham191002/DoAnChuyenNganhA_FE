import { Component } from '@angular/core';
import {StatisticsComponent} from './statistics/statistics.component';
import {OrderListComponent} from './order-list/order-list.component';
import {UserListComponent} from './user-list/user-list.component';
import {ProductManagerComponent} from './product-manager/product-manager.component';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-admin',
  imports: [CommonModule, ProductManagerComponent, UserListComponent, OrderListComponent, StatisticsComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  activeTab: string = 'products';

}
