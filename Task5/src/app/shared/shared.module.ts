import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { BarChartComponent } from './bar_chart.component';

@NgModule({
  imports: [
    CommonModule,
    NgChartsModule,
    BarChartComponent 
  ],
  exports: [
    NgChartsModule,
    BarChartComponent
  ]
})
export class SharedModule { }