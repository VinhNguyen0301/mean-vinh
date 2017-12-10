import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Product } from '../shared/models/product.model';

@Injectable()
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('/api/products');
  }

  countProducts(): Observable<number> {
    return this.http.get<number>('/api/products/count');
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>('/api/product', product);
  }

  getProduct(product: Product): Observable<Product> {
    return this.http.get<Product>(`/api/product/${product}`);
  }

  editProduct(product: Product): Observable<string> {
    return this.http.put(`/api/product/${product._id}`, product, { responseType: 'text' });
  }

  deleteProduct(product: Product): Observable<string> {
    return this.http.delete(`/api/product/${product._id}`, { responseType: 'text' });
  }

}
