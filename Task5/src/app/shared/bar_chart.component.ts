import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  template: `
    <div style="display: block;">
      <canvas baseChart
        [data]="barChartData"
        [type]="'bar'"
        [options]="chartOptions">
      </canvas>
    </div>
  `
})
export class BarChartComponent {
  @Input() barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: []
  };

  @Input() chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
    },
  };
}