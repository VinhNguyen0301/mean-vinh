import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../services/auth.service';
import { ToastComponent } from '../shared/toast/toast.component';

import { Product } from '../shared/models/product.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {
  
  constructor( public toast: ToastComponent ) { }

  products = []
  ngOnInit() {
    this.products = JSON.parse(localStorage.getItem('cart'))
  }

  removeProduct(product: Product) {
    var a = JSON.parse(localStorage.getItem('cart'))
    a.splice(a.indexOf(product), 1);
    localStorage.setItem('cart', JSON.stringify(a));
    this.products = JSON.parse(localStorage.getItem('cart'))
    this.toast.setMessage('Product already remove from cart.', 'success');
  }
}
