// product.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { ProductInterface } from '../models/product-interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://jsonblob.com/api/1330191336711839744';
  private productsSubject = new BehaviorSubject<ProductInterface[]>([]);
  products$ = this.productsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadProducts();
  }

  loadProducts(): void {
    this.http.get<ProductInterface[]>(this.apiUrl).subscribe((data) => {
      this.productsSubject.next(data);
    });
  }

  addProduct(product: Omit<ProductInterface, '_id'>): void {
    const newProduct = {
      ...product,
      _id: uuidv4()
    }
    const currentProducts = this.productsSubject.value;
    currentProducts.push(newProduct);
  
    this.productsSubject.next(currentProducts);
  }

  deleteProduct(id: string): void {
    const products = this.productsSubject.value.filter((p) => p._id !== id);
    this.productsSubject.next([...products]);
  }
}