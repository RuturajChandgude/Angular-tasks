import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectLoading, selectUsers } from './store/selector';
import { loadChartData } from './store/action';
import { User } from './store/model';
import { SharedModule } from './shared/shared.module';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SharedModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private store = inject(Store);
  users$ = this.store.select(selectUsers);

  ageChartData: ChartData<'bar'> = { labels: [], datasets: [] };
  salaryChartData: ChartData<'bar'> = { labels: [], datasets: [] };

  chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  ngOnInit() {
    this.store.dispatch(loadChartData());

    this.users$.subscribe((users: User[]) => {
      const labels = users.map(user => user.Name);
      const ageData = users.map(user => user.Age);
      const salaryData = users.map(user => user.Salary);

      this.ageChartData = {
        labels,
        datasets: [{ data: ageData, label: 'Age' }]
      };

      this.salaryChartData = {
        labels,
        datasets: [{ data: salaryData, label: 'Salary' }]
      };
    });
  }
}