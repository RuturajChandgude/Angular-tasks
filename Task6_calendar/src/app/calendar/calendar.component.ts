import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuoteService,Quote } from '../quote.service';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
export interface Day {
  date: Date;
  quote: string[];
  currentMonth: boolean;
}

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule,FormsModule,MatCardModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit{
currentdate=new Date();
daysinMonth:Day[]=[]
daysinweek:Day[]=[]
quotes:Quote[]=[]

  constructor(private quoteservice:QuoteService){}

  ngOnInit(){
    this.quoteservice.getQuotes().subscribe((quotes)=>{
      this.quotes=quotes
      this.generateMonthDays();
    })
  }

  generateMonthDays(){
    this.daysinMonth = [];
    const year=this.currentdate.getFullYear()
    const month=this.currentdate.getMonth();

    const month_start=new Date(year,month,1) //1 for first day of the month
    
    const month_end=new Date(year,month+1,0)
    //0 will give the previous day of the start day of the month

    const total_days=month_end.getDate()
    const startdayindex=(month_start.getDay()+6)%7
    //getday gives 0 based index starting from sunday as week start
    //i want monday to be start of the week 
 

    const prevMonth_totaldays=new Date(year,month,0).getDate()

    for(let i=startdayindex-1;i>=0;i--)
    {
      const prevDate=new Date(year,month-1,prevMonth_totaldays-i);
      this.daysinMonth.push({
        date:prevDate,
        quote:this.getQuotesForDate(prevDate),
        currentMonth:false,
      })
    }

    for(let i=1;i<=total_days;i++)
    {
      const currentDate=new Date(year,month,i);
      this.daysinMonth.push({
        date:currentDate, quote:this.getQuotesForDate(currentDate), currentMonth:true
      })
    }


    const totalcells=Math.ceil(this.daysinMonth.length/7)*7
    const extradays=totalcells-this.daysinMonth.length;

    for(let i=1;i<=extradays;i++)
    {
      const nextDate=new Date(year,month+1,i);
      this.daysinMonth.push({
        date:nextDate,quote:this.getQuotesForDate(nextDate),currentMonth:false

      })
    }


  }
  getWeekDays(){
    this.currentdate=new Date()
    for(let i=1;i<=7;i++)
    {
      let first=this.currentdate.getDate()-this.currentdate.getDay()+i
      let day=new Date(this.currentdate.setDate(first)).toISOString().slice(0,10)
      this.daysinweek.push(day)
    }
  }
  getQuotesForDate(date: Date): string[] {
    const isoDate = date.toLocaleDateString('en-CA');
    return this.quotes.filter(
      function (value , index , array){
          console.log(value)
          return value.date===isoDate
      },
    ).map((value,index,array)=>{
      return value.quote
    })
    
  }

   nextMonth(){
    this.currentdate = new Date(this.currentdate.getFullYear(), this.currentdate.getMonth() + 1, 1);
    this.generateMonthDays();
  }

  previousMonth() {
    this.currentdate = new Date(this.currentdate.getFullYear(), this.currentdate.getMonth() - 1, 1);
    this.generateMonthDays();
  }
   getMonthLabel(): string {
    return this.currentdate.toLocaleString('default', { month: 'long', year: 'numeric' });
  }
}
