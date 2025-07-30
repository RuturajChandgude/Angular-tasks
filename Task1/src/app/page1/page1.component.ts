import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService,ProductDetails} from '../product.service';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { RouterModule,Router } from '@angular/router';
@Component({
  selector: 'app-page1',
  standalone: true,
  imports: [CommonModule,MatButtonModule,MatCardModule,MatInputModule,FormsModule,RouterModule],
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.css']
})
export class Page1Component {
  products:ProductDetails[]=[]
constructor(private productservice: ProductService,private router:Router){}

  ngOnInit(){
    this.products=this.productservice.getProducts()
  }

  increase(product:ProductDetails){
    product.quantity++
  }
  decrease(product:ProductDetails){
    if(product.quantity>0){
      product.quantity--
    }
  }

 
}
