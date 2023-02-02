import { CartService } from './../../services/cart.service';
import { Cart, CartItem } from './../../models/cart.model';
import { Input, OnInit } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent{

  private _cart: Cart = {items: []};
  itemsQuantity = 0;

  @Input()
  get cart(): Cart{
    return this._cart
  }

  set cart(cart: Cart){
    this._cart = cart
    this.itemsQuantity = cart.items
    .map((item)=> item.quantity)
    .reduce((prev, current)=> prev + current, 0)
  }

  constructor(private readonly _cartService: CartService) {}

  getTotal(items: Array<CartItem>): number{
    return this._cartService.getTotal(items)
  }

  onClearCart() {
    this._cartService.clearCart()
  }
}
