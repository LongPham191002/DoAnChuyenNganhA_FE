
import { Component, HostListener, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @ViewChild('searchInput') searchInput!: ElementRef;

  searchQuery: string = '';
  showDropdown: boolean = false;
  isSearching: boolean = false;

  // Dữ liệu tĩnh cho demo
  searchResults: any[] = [
    {
      id: 1,
      name: 'Áo thun nam cổ tròn',
      price: 199000,
      // image: 'assets/products/ao-thun.jpg'
    },
    {
      id: 2,
      name: 'Quần jean nam ống đứng',
      price: 499000,
      // image: 'assets/products/quan-jean.jpg'
    },
    {
      id: 3,
      name: 'Áo khoác gió unisex',
      price: 350000,
      // image: 'assets/products/ao-khoac.jpg'
    }
  ];

  constructor(private router: Router) {}

  onSearchInput() {
    if (this.searchQuery.length > 0) {
      this.showDropdown = true;
      this.isSearching = true;

      // Giả lập tìm kiếm
      setTimeout(() => {
        this.isSearching = false;
      }, 800);
    } else {
      this.showDropdown = false;
    }
  }

  clearSearch() {
    this.searchQuery = '';
    this.showDropdown = false;
    this.searchInput.nativeElement.focus();
  }

  navigate(path: string) {
    this.router.navigate([path]);
    this.showDropdown = false;
  }

  navigateToProduct(product: any) {
    this.router.navigate(['/product', product.id]);
    this.searchQuery = '';
    this.showDropdown = false;
  }

  logout() {
    console.log('Đăng xuất');
    // Xử lý đăng xuất ở đây
    this.router.navigate(['/login']);
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (this.searchInput?.nativeElement && !this.searchInput.nativeElement.contains(event.target)) {
      this.showDropdown = false;
    }
  }

}
