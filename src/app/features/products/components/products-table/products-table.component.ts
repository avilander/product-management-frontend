import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-products-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss'],
})
export class ProductsTableComponent {
  @Input() products: Product[] = [];
  @Output() select = new EventEmitter<Product>();
  @Output() delete = new EventEmitter<Product>();

  onSelect(product: Product): void {
    this.select.emit(product);
  }

  onDelete(product: Product, event: MouseEvent): void {
    event.stopPropagation();
    if (confirm(`Deseja realmente excluir o produto "${product.name}"?`)) {
      this.delete.emit(product);
    }
  }
}
