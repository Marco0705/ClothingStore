import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {

  productForm: FormGroup;
  defaultImageUrl = 'https://via.placeholder.com/300x200';

  constructor(
    private fb: FormBuilder,
    private productService: ProductService
  ) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],  
      description: ['', [Validators.required, Validators.minLength(10)]], 
      price: ['', [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      image: [this.defaultImageUrl, [Validators.required]], 
      active: [true]
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
         if (!this.productForm.get('image')?.value) {
        this.productForm.patchValue({ image: this.defaultImageUrl });
      }
      this.productService.addProduct(this.productForm.value);
      this.productForm.reset({ active: true, image: this.defaultImageUrl });
    } else {
      Object.keys(this.productForm.controls).forEach(key => {
        const control = this.productForm.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
    }
  }
}
