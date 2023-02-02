import { Product } from './../models/product.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const STORE_BASE_API = 'https://fakestoreapi.com'

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private readonly http: HttpClient) { }

  getAllProduct(limit='12', sort='desc', category?: string): Observable<Array<Product>>{
    return this.http.get<Array<Product>>(
      `${STORE_BASE_API}/products${category ? '/category/' + category : ''}?sort=${sort}&limit=${limit}`
    )
  }
  getAllCategories(): Observable<Array<string>>{
    return this.http.get<Array<string>>(`${STORE_BASE_API}/products/categories`)
  }
}
