import { Component, inject ,OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectLoading, selectUsers } from './store/selector';
import { loadChartData } from './store/action';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Task5';
  private store=inject(Store)

  user$=this.store.select(selectUsers)
  loading$=this.store.select(selectLoading)
  
  ngOnInit():void{
    this.store.dispatch(loadChartData())
  }
  
}
