import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartItem ,CartService} from '../cart.service';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
@Component({
  selector: 'app-purchase',
  standalone: true,
  imports: [CommonModule,MatCardModule,MatFormFieldModule,FormsModule,MatInputModule],
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent {
 products:CartItem[]=[]
 constructor(private cartService:CartService,private router:Router){}

 ngOnInit(): void {
    this.cartService.getProducts().subscribe(data => {
      
      this.products = data.map(product => ({ ...product, quantity: 0 }));
    });
  }

  increaseQty(item: CartItem): void {
    item.quantity++;
  }

  decreaseQty(item: CartItem): void {
    if (item.quantity > 0) {
      item.quantity--;
    }
  }

  getTotalAmount(): number {
    return this.products.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  buyNow(): void {
    const selectedItems = this.products.filter(item => item.quantity > 0);
    this.cartService.placeOrder(selectedItems).subscribe(() => {
      this.router.navigate(['/orders']);
    });
  }
}
