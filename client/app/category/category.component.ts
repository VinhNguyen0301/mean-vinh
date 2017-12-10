import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { CategoryService } from '../services/category.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { Category } from '../shared/models/category.model';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html'
})
export class CategoryComponent implements OnInit {

  category = new Category();
  categories: Category[] = [];
  isLoading = true;
  isEditing = false;
  isDetail = false;

  addCategoryForm: FormGroup;
  name = new FormControl('', Validators.required);

  constructor(private categoryService: CategoryService,
              private formBuilder: FormBuilder,
              public toast: ToastComponent,
              public auth: AuthService ) { }

  ngOnInit() {
    this.getCategorys();
    this.addCategoryForm = this.formBuilder.group({
      name: this.name
    });
  }

  getCategorys() {
    this.categoryService.getCategorys().subscribe(
      data => this.categories = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addCategory() {
    this.categoryService.addCategory(this.addCategoryForm.value).subscribe(
      res => {
        this.categories.push(res);
        this.addCategoryForm.reset();
        this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  enableEditing(category: Category) {
    this.isEditing = true;
    this.category = category;
  }

  enableDetail(category: Category) {
    this.isDetail = true;
    this.category = category;
  }

  cancelEditing() {
    this.isEditing = false;
    this.category = new Category();
    this.toast.setMessage('item editing cancelled.', 'warning');
    this.getCategorys();
  }

  editCategory(category: Category) {
    this.categoryService.editCategory(category).subscribe(
      () => {
        this.isEditing = false;
        this.category = category;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  deleteCategory(category: Category) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.categoryService.deleteCategory(category).subscribe(
        () => {
          const pos = this.categories.map(elem => elem._id).indexOf(category._id);
          this.categories.splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error)
      );
    }
  }

}
