import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { OrdersComponent } from './orders/orders.component';
export const routes: Routes = [
    {path:'',component:RegisterComponent},
    {path:'login',component:LoginComponent},
    {path:'purchase',component:PurchaseComponent},
    {path:'orders',component:OrdersComponent}
];
