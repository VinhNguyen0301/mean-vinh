import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Category } from '../shared/models/category.model';

@Injectable()
export class CategoryService {

  constructor(private http: HttpClient) { }

  getCategorys(): Observable<Category[]> {
    return this.http.get<Category[]>('/api/categories');
  }

  countCategorys(): Observable<number> {
    return this.http.get<number>('/api/categories/count');
  }

  addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>('/api/category', category);
  }

  getCategory(category: Category): Observable<Category> {
    return this.http.get<Category>(`/api/category/${category}`);
  }

  editCategory(category: Category): Observable<string> {
    return this.http.put(`/api/category/${category._id}`, category, { responseType: 'text' });
  }

  deleteCategory(category: Category): Observable<string> {
    return this.http.delete(`/api/category/${category._id}`, { responseType: 'text' });
  }

}
