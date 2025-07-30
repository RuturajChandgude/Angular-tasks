import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetails, ProductService } from '../product.service';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit{
selectedProducts:ProductDetails[]=[]
constructor(private productservice:ProductService){}

ngOnInit(){
this.selectedProducts=this.productservice.getProducts().filter(p=>p.quantity>0)

}

getTotalPrice(product:ProductDetails){
  return product.price*product.quantity
}
getFinalTotalprice():number{
  return this.selectedProducts.reduce((sum,p)=>sum+this.getTotalPrice(p),0)
}
}
