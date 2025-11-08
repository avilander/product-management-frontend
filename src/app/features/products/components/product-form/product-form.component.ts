import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { ProductsApiService } from '../../../../core/services/products-api.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnChanges {
  @Input() product: Product | null = null;      // 👈 produto pra edição
  @Output() saved = new EventEmitter<void>();   // 👈 disparado ao salvar
  @Output() cancelEdit = new EventEmitter<void>();

  form!: FormGroup;
  saving = false;

  constructor(
    private fb: FormBuilder,
    private api: ProductsApiService
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(200)]],
      category: ['', [Validators.required, Validators.maxLength(100)]],
      unitCost: [null as number | null, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product']) {
      if (this.product) {
        // modo edição → preenche o form
        this.form.patchValue({
          name: this.product.name,
          category: this.product.category,
          unitCost: this.product.unitCost,
        });
      } else {
        // saiu do modo edição → limpa o form
        this.form.reset();
      }
    }
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving = true;
    const value = this.form.value;

    if (this.product) {
      // 🔁 atualizar
      this.api
        .update({
          id: this.product.id,
          name: value.name!,
          category: value.category!,
          unitCost: value.unitCost!,
        })
        .subscribe({
          next: () => {
            this.saved.emit();
          },
          error: (err) => console.error('Erro ao atualizar produto', err),
          complete: () => (this.saving = false),
        });
    } else {
      // ➕ criar
      this.api
        .create({
          name: value.name!,
          category: value.category!,
          unitCost: value.unitCost!,
        })
        .subscribe({
          next: () => {
            this.form.reset();
            this.saved.emit();
          },
          error: (err) => console.error('Erro ao criar produto', err),
          complete: () => (this.saving = false),
        });
    }
  }

  onCancel(): void {
    this.form.reset();
    this.cancelEdit.emit();
  }
}
