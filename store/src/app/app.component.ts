import { CartService } from 'src/app/services/cart.service';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Cart } from './models/cart.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent implements OnInit {

  cart: Cart = {items: []};

  constructor(private readonly _cartService: CartService) {}

  ngOnInit(): void {
      this._cartService.cart.subscribe((_cart)=>{
        this.cart = _cart
      })
  }

}
