import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../services/product.service';
import { CategoryService } from '../../../../services/category.service';
import { CommonModule } from '@angular/common';
import { Product } from '@src/models/product.model';
import { Category } from '@src/models/category.model';
import { CartService } from '@src/services/cart.service';
import { CartItem } from '@src/models/cart-item.model';
import { FormsModule } from '@angular/forms';
import { NgbModule, NgbModal, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbModule, RouterModule, NgbToastModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {
  protected products: Product[] = [];
  protected filteredProducts: Product[] = [];
  protected categories: Category[] = [];
  protected recommendedProducts: Product[] = [];
  protected selectedProduct: Product | null = null;
  protected quantity: number = 1;
  protected showToast: boolean = false;
  protected toastMessage: string = '';

  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 9;
  totalPages: number = 1;

  // Filters
  selectedCategory: number | null = null;
  selectedSize: string = '';
  selectedColor: string = '';
  priceRange = {
    min: 0,
    max: 3000,
    selectedMin: 0,
    selectedMax: 3000
  };

  // TODO: please fix //
  // response api
  // variants [color | sizes]
  // Available filters
  colors = [
    { name: 'Gray', count: 3 },
    { name: 'Red', count: 25 },
    { name: 'Yellow', count: 112 },
    { name: 'Green', count: 72 },
    { name: 'Teal', count: 9 },
    { name: 'Cyan', count: 29 }
  ];

  sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private cartService: CartService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
    this.loadRecommendedProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      console.log("products", this.products);
      this.applyFilters();
    });
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  loadRecommendedProducts() {
    this.productService.getRecommendedProducts().subscribe(products => {
      this.recommendedProducts = products;
    });
  }

  // Filter methods
  onCategoryChange(categoryId: number | null) {
    this.selectedCategory = categoryId;
    this.currentPage = 1;
    this.applyFilters();
  }

  onPriceChange(min: number, max: number) {
    this.priceRange.selectedMin = min;
    this.priceRange.selectedMax = max;
    this.currentPage = 1;
    this.applyFilters();
  }

  onSizeChange(size: string) {
    this.selectedSize = size;
    this.currentPage = 1;
    this.applyFilters();
  }

  onColorChange(color: string) {
    this.selectedColor = color;
    this.currentPage = 1;
    this.applyFilters();
  }

  applyFilters() {
    this.filteredProducts = this.products.filter(product => {
      const matchesCategory = !this.selectedCategory || product.category_id === this.selectedCategory;
      const matchesPrice = product.price >= this.priceRange.selectedMin && product.price <= this.priceRange.selectedMax;
      const matchesSize = !this.selectedSize || (product.size && product.size.includes(this.selectedSize));
      const matchesColor = !this.selectedColor || product.color.includes(this.selectedColor);

      return matchesCategory && matchesPrice && matchesSize && matchesColor;
    });

    this.totalPages = Math.ceil(this.filteredProducts.length / this.itemsPerPage);
    this.updatePagination();
  }

  // Pagination methods
  updatePagination() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.filteredProducts = this.filteredProducts.slice(startIndex, endIndex);
  }

  onPageChange(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.applyFilters();
    }
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  // Cart methods
  addToCart(product: Product) {
    if (!product) return;

    // Validate size selection if product has sizes
    if (product.size && product.size.length > 0 && !this.selectedSize) {
      this.showToastMessage('Please select a size');
      return;
    }

    // Validate color selection if product has colors
    if (product.color && product.color.length > 0 && !this.selectedColor) {
      this.showToastMessage('Please select a color');
      return;
    }
    
    const cartItem: CartItem = {
      productId: product.product_id,
      name: product.product_name,
      price: product.price,
      quantity: this.quantity,
      imageUrl: product.image_url,
      size: this.selectedSize,
      color: this.selectedColor
    };

    this.cartService.addToCart(cartItem);
    this.showToastMessage('Product added to cart successfully!');
    this.quantity = 1; // Reset quantity after adding to cart
    this.selectedSize = ''; // Reset size selection
    this.selectedColor = ''; // Reset color selection
  }

  private showToastMessage(message: string) {
    this.toastMessage = message;
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }

  // Quick view methods
  openQuickView(content: any, product: Product) {
    this.selectedProduct = product;
    this.quantity = 1;
    this.modalService.open(content, { 
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg',
      centered: true
    });
  }

  increment() {
    if (this.quantity < 99) {
      this.quantity++;
    }
  }

  decrement() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
}
