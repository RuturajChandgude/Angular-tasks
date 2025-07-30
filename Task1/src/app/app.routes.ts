import { Routes } from '@angular/router';
import { SummaryComponent } from './summary/summary.component';
import { Page1Component } from './page1/page1.component';

export const routes: Routes = [
    {path:'',component:Page1Component},
   { path: 'summary', component:SummaryComponent },
];
