import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService, CartItem, Order } from '../cart.service';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule, MatButtonModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  latestOrder: CartItem[] = [];
  latestOrderId: number | undefined;
  displayedColumns: string[] = ['name', 'quantity', 'total', 'actions'];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getOrders().subscribe((orders) => {
      const lastOrder = orders[orders.length - 1];
      this.latestOrder = lastOrder.products;
      this.latestOrderId = lastOrder.id;
    });
  }

  getTotalAmount(): number {
    return this.latestOrder.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  editItem(item: CartItem): void {
    const newQty = prompt(`Edit quantity for ${item.name}`, item.quantity.toString());
    if (newQty !== null) {
      const qty = parseInt(newQty);
      if (!isNaN(qty) && qty >= 0) {
        item.quantity = qty;

        if (this.latestOrderId !== undefined) {
          this.cartService.updateOrder(this.latestOrderId, {
            products: this.latestOrder
          }).subscribe();
        }
      }
    }
  }

  deleteItem(item: CartItem): void {
    this.latestOrder = this.latestOrder.filter(i => i.id !== item.id);

    if (this.latestOrderId !== undefined) {
      this.cartService.updateOrder(this.latestOrderId, {
        products: this.latestOrder
      }).subscribe();
    }
  }

  deleteOrder(): void {
    if (this.latestOrderId !== undefined && confirm('Are you sure you want to delete this order?')) {
      this.cartService.deleteOrder(this.latestOrderId).subscribe(() => {
        this.latestOrder = [];
        this.latestOrderId = undefined;
      });
    }
  }
}
