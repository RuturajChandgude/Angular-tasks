import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuoteService,Quote } from '../quote.service';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { AddEventDialogComponent } from '../add-event-dialog/add-event-dialog.component';
import { MatDialog,MatDialogModule } from '@angular/material/dialog';
import { ShowDetailsDialogComponent } from '../show-details-dialog/show-details-dialog.component';
export interface Day {
  date: Date;
  quote: string[];
  currentMonth: boolean;
}

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule,FormsModule,MatCardModule,MatDialogModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit{
currentdate=new Date();
daysinMonth:Day[]=[]
daysinweek:Day[]=[]
quotes:Quote[]=[]
 viewMode: 'month' | 'week' = 'month';
  constructor(private quoteservice:QuoteService,private dialog:MatDialog){}

  ngOnInit(){
    this.quoteservice.getQuotes().subscribe((quotes)=>{
      this.quotes=quotes,
       this.generateMonthDays();
      this.getWeekDays(this.currentdate);
    })
  }
 onViewChange(view: 'month' | 'week') {
    this.viewMode = view;
    if (view === 'week') {
      this.getWeekDays(this.currentdate);
    } else {
      this.generateMonthDays();
    }
  }

  onDayClick(day: Day) {
    if (day.date) {
      this.viewMode = 'week';
      this.getWeekDays(day.date);
    }
  }

 openAddEventDialog(){
  const dialogRef=this.dialog.open(AddEventDialogComponent);
  dialogRef.afterClosed().subscribe(result=>{
    if(result){
      this.addEventtoCalendar(result.date,result.quote)
    }
  })
 }

 addEventtoCalendar(date:Date,quote:string){
  const isoDate=date.toLocaleDateString('en-CA');
  const newQuote:Quote={date:isoDate,quote}

  this.quoteservice.postQuote(newQuote).subscribe(newsavedquote=>{
    this.quotes.push(newsavedquote);

    if(this.viewMode==='month'){
      this.generateMonthDays()
    }else{
      this.getWeekDays(date)
    }
  })
 }


 showDetails(){

  const details=this.quoteservice.getQuoteDetails().subscribe((quoteData)=>{
      console.log(quoteData)
      
    })
  const dialog=this.dialog.open(ShowDetailsDialogComponent,
    
  )
 }

  getWeekDays(reference_date: Date) {
    this.daysinweek = [];
    const dayIndex = (reference_date.getDay() + 6) % 7;
    const startOfWeek = new Date(reference_date);
    startOfWeek.setDate(reference_date.getDate() - dayIndex);

    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      this.daysinweek.push({
        date,quote: this.getQuotesForDate(date), currentMonth: date.getMonth() === this.currentdate.getMonth()
      });
    }
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
      this.daysinMonth.push({ date:prevDate, quote:this.getQuotesForDate(prevDate),
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
