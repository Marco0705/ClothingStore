import { Component } from '@angular/core';
import { ProductListComponent } from "./components/product-list/product-list.component";
import { ProductFormComponent } from "./components/product-form/product-form.component";
import { ProductCardComponent } from "./components/product-card/product-card.component";
import { ProductFilterComponent } from "./components/product-filter/product-filter.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProductListComponent, ProductFormComponent, ProductCardComponent, ProductFilterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'product_management';
}
