import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js'
import { Component } from '@angular/core';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {

  cart: Cart = {items: [{
    product: 'https://via.placeholder.com/150',
    name: 'snickers',
    price: 150,
    quantity: 1,
    id: 1
  },
  {
    product: 'https://via.placeholder.com/150',
    name: 'nike',
    price: 120,
    quantity: 2,
    id: 2
  }]}
  dataSource: Array<CartItem> = [];
  displayedColumns: Array<string> = [
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action'
  ]

  constructor(private readonly _cartService: CartService, private readonly http: HttpClient) {}

  ngOnInit(): void {
    this._cartService.cart.subscribe((_cart: Cart)=>{
      this.cart = _cart
      this.dataSource = this.cart.items
    })
  }

  getTotal(items: Array<CartItem>): number{
    return this._cartService.getTotal(items)
  }

  onClearCart(): void{
    this._cartService.clearCart()
  }

  onRemoveFromCart(item: CartItem): void {
    this._cartService.removeFromCart(item);  
  }  

  onAddQuantity(items: CartItem): void {
    this._cartService.addToCart(items)
  }

  onRemoveQuantity(items: CartItem): void {
    this._cartService.removeQuantity(items)  
  }

  onCheckout(): void {
    this.http.post('http://localhost:4242/checkout', {
      items: this.cart.items
    }).subscribe(async(res: any)=>{
      let stripe = await loadStripe('pk_test_51MX1Z8BAs3evRfTMuvijOXvcyMRJDfmBb6nU7b2AQtSKkJdELwy7p5iWsMvhW941uTbqkgHMYGJRuc3vVUVgrINB00NB3bXOrL')
      stripe?.redirectToCheckout({
        sessionId: res.id
      })
    })
    }

}
