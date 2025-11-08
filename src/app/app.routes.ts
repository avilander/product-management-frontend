import { Routes } from '@angular/router';
import { ProductsPageComponent } from './features/products/components/products-page/products-page.component';

export const routes: Routes = [
  { path: '', component: ProductsPageComponent },
  { path: '**', redirectTo: '' },
];
