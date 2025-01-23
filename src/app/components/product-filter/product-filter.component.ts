// product-filter.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-filter',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './product-filter.component.html',
  styleUrl: './product-filter.component.css'
})
export class ProductFilterComponent {
  filters = {
    name: '',
    category: '',
    price: undefined as number | undefined,
    active: undefined as boolean | undefined
  };

  @Output() filter = new EventEmitter<any>();

  onFilter() {
    // Emitimos los filtros al componente padre
    this.filter.emit(this.filters);
  }
}