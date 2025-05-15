import { Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

// import * as RoleGuards from '../../guards/role.guard';

export const LAYOUT_ROUTES: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./home/home.route').then((m) => m.HOME_ROUTES),
      },

      {
        path: 'product/:id',
        loadChildren: () =>
        import('./product/product.route').then((m) => m.PRODUCT_ROUTES),
      },
      {
        path: 'product-detail/:id',
        loadChildren: () =>
          import('./product-detail/product-detail.route').then(
            (m) => m.PRODUCT_DETAIL_ROUTES,
          ),
      },
      {
        path: 'checkout/:id',
        loadChildren: () =>
          import('./checkout/checkout.route').then((m) => m.CHECKOUT_ROUTES),
      },
      {
        path: 'cart',
        loadChildren: () =>
          import('./cart/cart.route').then((m) => m.CART_ROUTES),
      },
      {
        path: 'invoice',
        loadChildren: () =>
          import('./invoice/invoice.route').then((m) => m.INVOICE_ROUTES),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./profile/profile.route').then(
            (m) => m.PROFILE_ROUTES,
          ),
      },


      // {
      //   path: 'book-info/:id',
      //   loadChildren: () =>
      //     import('./sub-pages/book-info/book-info.route').then(
      //       (m) => m.BOOK_INFO_ROUTES,
      //     ),
      // },

      // {
      //   path: 'admin',
      //   loadChildren: () =>
      //     import('./sub-pages/admin/admin.route').then((m) => m.ADMIN_ROUTES),
      //   canActivate: [RoleGuards.canActivateAdmin],
      // },
      // {
      //   path: 'reading/:id',
      //   loadChildren: () =>
      //     import('./sub-pages/reading/reading.route').then(
      //       (m) => m.READING_ROUTES,
      //     ),
      // },
      // {
      //   path: 'categories/:type',
      //   loadChildren: () =>
      //     import('./sub-pages/categories/categories.route').then(
      //       (m) => m.CATEGORIES_ROUTES,
      //     ),
      // },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
];
