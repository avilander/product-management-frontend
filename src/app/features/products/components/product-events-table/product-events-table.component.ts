import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductEvent } from '../../models/product-event.model';

@Component({
  selector: 'app-product-events-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-events-table.component.html',
  styleUrls: ['./product-events-table.component.scss'],
})
export class ProductEventsTableComponent {
  @Input() events: ProductEvent[] = [];
}
