import { Injectable } from '@angular/core';
import { BehaviorSubject,Observable,Subscription,timer,map} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class WatchService {
  private starttime=0;
  private timer=new BehaviorSubject<number>(this.starttime)
  private lastStoppedTime:number=this.starttime
  private timer_subscription:Subscription=new Subscription()
  private isRunning=false

  constructor() { }
  public get stopWatch():Observable<number>{
    return this.timer.pipe(
      map((val:number)=>val)
    )
  }
  startCount(){
    if(this.isRunning) return

    this.timer_subscription=timer(0,1000).pipe(map((value:number):number=>value+this.lastStoppedTime)).subscribe(this.timer)

    this.isRunning=true
  }

  stopCount(){
    this.lastStoppedTime=this.timer.value;
    this.timer_subscription.unsubscribe();
    this.isRunning=false
  }

  resetCount(){
    this.timer_subscription.unsubscribe();
    this.lastStoppedTime=this.starttime;
    this.timer.next(this.starttime)
    this.isRunning=false
  }
}
