import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductInterface } from '../../models/product-interface';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  @Input() product!: ProductInterface;
  @Output() delete = new EventEmitter<string>();

  defaultImageUrl = 'https://via.placeholder.com/300x200';

  handleImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = this.defaultImageUrl;
  }

  onDelete() {
    this.delete.emit(this.product._id);
  }
}
