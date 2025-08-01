import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { CartService, CartItem,Order } from '../cart.service';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule,MatCardModule,MatTableModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit{
  latestOrder:CartItem[]=[]
  latestOrderId:number | undefined

constructor(private cartService: CartService,){}
ngOnInit(): void {
  this.cartService.getOrders().subscribe((orders) => {
      const lastOrder = orders[orders.length - 1];
      this.latestOrder = lastOrder.products;

    });
}

  getTotalAmount(): number {
    return this.latestOrder.reduce((total, item) => total + item.price * item.quantity, 0);
  }
}
