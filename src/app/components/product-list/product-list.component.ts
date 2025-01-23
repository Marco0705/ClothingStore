import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductCardComponent } from "../product-card/product-card.component";
import { ProductFilterComponent } from "../product-filter/product-filter.component";
import { ProductFormComponent } from "../product-form/product-form.component";
import { ProductInterface } from '../../models/product-interface';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductCardComponent, ProductFilterComponent, CommonModule, ProductFormComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  products: ProductInterface[] = [];
  filteredProducts: ProductInterface[] = [];

  constructor(private productService: ProductService) {
    // Suscribirse al observable de productos
    this.subscription.add(
      this.productService.products$.subscribe(products => {
        this.products = products;
        this.filteredProducts = products; // Inicialmente mostrar todos los productos
      })
    );
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onFilter(filters: any): void {
    this.filteredProducts = this.products.filter(product => {
      return (
        (!filters.name || product.name.toLowerCase().includes(filters.name.toLowerCase())) &&
        (!filters.category || product.category === filters.category) &&
        (!filters.price || product.price <= filters.price) &&
        (filters.active === undefined || product.active === filters.active)
      );
    });
  }

  onDeleteProduct(id: string): void {
    this.productService.deleteProduct(id);
  }
}