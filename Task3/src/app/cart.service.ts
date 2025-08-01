import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  offer?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id?: number;
  products: CartItem[];
 
}
@Injectable({
  providedIn: 'root'
})

export class CartService {
  private productUrl = 'http://localhost:3000/carts'; 
  private ordersUrl = 'http://localhost:3000/orders'
  constructor(private http:HttpClient) { }

  getProducts():Observable<Product[]>{
    return this.http.get<Product[]>(this.productUrl)
  }

  placeOrder(CartItems:CartItem[]):Observable<Order>{
    const order:Order={products:CartItems};
    return this.http.post<Order>(this.ordersUrl,order)
  }
  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.ordersUrl);
  }

  updateOrder(id: number, data: Partial<Order>): Observable<Order> {
    return this.http.put<Order>(`${this.ordersUrl}/${id}`, data);
  }

  deleteOrder(id: number): Observable<void> {
    return this.http.delete<void>(`${this.ordersUrl}/${id}`);
  } 
  

}