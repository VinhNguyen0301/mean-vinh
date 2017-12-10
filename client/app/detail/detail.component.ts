import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../services/auth.service';
import { ToastComponent } from '../shared/toast/toast.component';

import { ProductService } from '../services/product.service';

import { Product } from '../shared/models/product.model';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html'
})
export class DetailComponent implements OnInit {

  constructor(private productService: ProductService,
              private router: Router,
              private route: ActivatedRoute,
              public toast: ToastComponent ) { }

  product = new Product();

  ngOnInit(){
    this.getProductDetail(this.route.snapshot.params['id']);
  }

  getProductDetail(id){
    this.productService.getProduct(id).subscribe(
      res => {
        this.product = res;
        console.log(this.product);
      },
      error => console.log(error)
      );
  }

  // ngOnInit() {
  //   var product_id = this.route.routerState.snapshot._root.children[0].value.params.id;
  //   this.productService.getProduct(product_id).subscribe(
  //     res => {
  //       this.product = res
  //     },
  //     error => console.log(error)
  //   );
  // }

  addToCart(product: Product) {
    var a;
    if (localStorage.getItem('cart') === null) {
      a = [];
    } else {
      a = JSON.parse(localStorage.getItem('cart'));
    }
     
    console.log(a)
    a.push(product);
    localStorage.setItem('cart', JSON.stringify(a));
    this.toast.setMessage('Add to cart!', 'success')
  }

}
