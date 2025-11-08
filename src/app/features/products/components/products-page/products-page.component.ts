import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsApiService } from '../../../../core/services/products-api.service';
import { Product } from '../../models/product.model';
import { ProductFormComponent } from '../product-form/product-form.component';
import { ProductsTableComponent } from '../products-table/products-table.component';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [
    CommonModule,
    ProductFormComponent,
    ProductsTableComponent,
  ],
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss'],
})
export class ProductsPageComponent implements OnInit {
  products = signal<Product[]>([]);
  selectedProduct = signal<Product | null>(null);
  loading = signal(false);

  constructor(private api: ProductsApiService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading.set(true);
    this.api.getAll().subscribe({
      next: (data) => this.products.set(data),
      error: (err) => console.error('Erro ao carregar produtos', err),
      complete: () => this.loading.set(false),
    });
  }

  // quando salva (criou ou editou) -> recarrega lista e limpa seleção
  onProductSaved(): void {
    this.loadProducts();
    this.selectedProduct.set(null);
  }

  onSelectProduct(product: Product): void {
    this.selectedProduct.set(product);
  }

  onDeleteProduct(product: Product): void {
    this.api.delete(product.id).subscribe({
      next: () => {
        if (this.selectedProduct()?.id === product.id) {
          this.selectedProduct.set(null);
        }
        this.loadProducts();
      },
      error: (err) => console.error('Erro ao deletar produto', err),
    });
  }

  onCancelEdit(): void {
    this.selectedProduct.set(null);
  }
}