import { Component ,OnInit,OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { WatchService } from '../watch.service';
@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.css']
})
export class StopwatchComponent implements OnInit,OnDestroy {
counter:number=0;
private subscription:Subscription=new Subscription()
constructor(private watchService:WatchService){}
 ngOnInit() {
  this.subscription.add(
    this.watchService.stopWatch.subscribe((val:number)=>this.counter=val)
  )
 }

 public startCount(){
  this.watchService.startCount()
 }

 public stopCount(){
  this.watchService.stopCount()

 }

 public resetCount(){
  this.watchService.resetCount()
 }
 ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
