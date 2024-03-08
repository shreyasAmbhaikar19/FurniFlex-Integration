import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../../Services/product.service';
import { Product } from '../../Models/products';


@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  productForm!: FormGroup;

  constructor(private fb: FormBuilder, private productService: ProductService,private httpclient:HttpClient) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', Validators.required],
      image: ['']
    });
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.productForm.get('image')!.setValue(file);
    }
  }

  onSubmit() {
    if (this.productForm.invalid) {
      return;
    }
  
    const productData = this.productForm.value;
    const formData = new FormData();
  
    formData.append('name', productData.name);
    formData.append('description', productData.description);
    formData.append('category', productData.category);
    formData.append('price', productData.price);
    formData.append('image', productData.image);
  
    this.productService.addProduct(formData).subscribe({
      next: (response) => {
        console.log('Product created successfully:', response);
      },
      error: (error) => {
        console.error('Error creating product:', error);
      }
    });
  }
}