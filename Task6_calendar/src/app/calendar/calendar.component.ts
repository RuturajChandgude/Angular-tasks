import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuoteService,Quote } from '../quote.service';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AddEventDialogComponent } from '../add-event-dialog/add-event-dialog.component';
import { MatDialog,MatDialogModule } from '@angular/material/dialog';

import { FilterpipePipe } from '../filterpipe.pipe';
import {DateRange, MatDatepickerModule} from '@angular/material/datepicker';
import {ChangeDetectionStrategy} from '@angular/core';
import { DateAdapter, NativeDateAdapter} from '@angular/material/core';

import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
export interface Day {

  date: Date;
  quote: string[];
  author:string;
  currentMonth: boolean;
}

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule,MatFormFieldModule,MatDatepickerModule,FilterpipePipe,FormsModule,MatCardModule,MatButtonModule,MatDialogModule],
  providers: [{ provide: DateAdapter, useClass: NativeDateAdapter }],
 
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit{
currentdate=new Date();
daysinMonth:Day[]=[]
daysinweek:Day[]=[]
quotes:Quote[]=[]
events:Quote[]=[]

filtername:string=''

start : string = '';

startDate:Date | null=null
endDate:Date | null=null

viewMode: 'month' | 'week' | 'list' = 'month';
  constructor(private quoteservice:QuoteService,private dialog:MatDialog){}

  ngOnInit(){
    this.quoteservice.getQuotes().subscribe((quotes)=>{
      this.quotes=quotes,
       this.generateMonthDays();
      this.getWeekDays(this.currentdate);
    })
    
    // this.start = document.getElementById('picker')?.innerHTML
    
     //this.generateMonthDays();
  }
  rangeWeekDays(date:Date):DateRange<any>{
      if (date) {
      const d = new Date(date)
      const day = d.getDay();
      const diff = d.getDate() - day + (day == 0 ? -6 : 1);
      const start = new Date(d.setDate(diff));
      const end = new Date(d.setDate(diff + 6));
      return new DateRange<any>(start, end);
  }

  /**
   * Changes the calendar view mode between month and week.
   * @param view The selected view mode
   */
 onViewChange(view: 'month' | 'week' | 'list') {
    this.viewMode = view;
    if (view === 'week') {
      this.getWeekDays(this.currentdate);
    } else if(view==='month') {
      this.generateMonthDays();
    }else{
      this.showlist()
    }
  }

   showlist(){
    this.quoteservice.getQuoteDetails().subscribe((data)=>{
      //this.events={...data}
      this.events=Array.from(data)
      console.log(typeof(this.events))
      console.log(this.events)
    })
   }
   /**
   * Handles a click on a day cell.
   * Switches to week view focused on that day.
   * @param day The clicked day object
   */
  onDayClick(day: Day) {
    if (day.date) {
     
      this.currentdate = new Date(day.date); 
    this.viewMode = 'week';
    this.getWeekDays(this.currentdate);
    }
  }

  /**
   * Opens the dialog for adding a new event.
   */
 openAddEventDialog(){
  const dialogRef=this.dialog.open(AddEventDialogComponent);
  dialogRef.afterClosed().subscribe(result=>{
    if(result){
      this.addEventtoCalendar(result.date,result.quote,result.author)
    }
  })
 }


editEvent(date:Date,quoteText:string,author:string){
const isoDate=date.toLocaleDateString('en-CA')
  const match=this.quotes.find(q=>q.date===isoDate && q.quote===quoteText)
  if(!match) return
const dialogRef=this.dialog.open(AddEventDialogComponent,{
  data:{id:match.id, date:date,quote:quoteText,author:author,isEdit:true, mode: 'edit'},
  
})

dialogRef.afterClosed().subscribe(result=>{
 // console.log(result)
  if(result){
    if(result.action==='delete' && result.id){
      if(confirm('Are you sure you want to delete')){
      this.quoteservice.deleteTask(result.id).subscribe(()=>{
        this.quotes=this.quotes.filter(q=>q.id!==result.id)
        this.viewMode==='month'?this.generateMonthDays():this.getWeekDays(this.currentdate)
      })}
    }else{
    this.quoteservice.getQuoteDetails().subscribe(allquotes=>{
      //const match=allquotes.find(q=>q.date===isoDate && q.quote===quoteText)
     
      const match=allquotes.find(function(value,index,array){
          return value.date===isoDate && value.quote===quoteText
      })
      if(match){
        const updatedQuote:Quote={
          id:match.id,
          date:result.date.toLocaleDateString('en-CA'),
          quote:result.quote,
          author:result.author
        }
        console.log(updatedQuote)
        this.quoteservice.updateTask(updatedQuote).subscribe(updated=>{
          const index=this.quotes.findIndex(q=>q.id===updated.id)
          if(index!==-1){
            this.quotes[index]=updated
          }

          if(this.viewMode==='month'){
            this.generateMonthDays()
          }else{
            this.getWeekDays(this.currentdate)
          }
      })
      }
      
    })}
  }
})
}


 /**
   * Adds a new quote to the calendar and updates the view.
   * @param date Date of the new quote
   * @param quote Quote text
   */
 addEventtoCalendar(date:Date,quote:string,author:string){
  const isoDate=date.toLocaleDateString('en-CA');
  const newQuote:Quote={date:isoDate,quote,author}

  this.quoteservice.postQuote(newQuote).subscribe(newsavedquote=>{
    this.quotes.push(newsavedquote);

    if(this.viewMode==='month'){
      this.generateMonthDays()
    }else{
      this.getWeekDays(date)
    }
  })
 }




  
   /**
   * Generates the days for the week view based on a reference date.
   * @param reference_date The date to determine the week
   */
  getWeekDays(reference_date: Date) {
    this.daysinweek = [];
    const dayIndex = (reference_date.getDay() + 6) % 7;
    const startOfWeek = new Date(reference_date);
    startOfWeek.setDate(reference_date.getDate() - dayIndex);

    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      
      date.setDate(startOfWeek.getDate() + i);
      this.daysinweek.push({
        date,quote: this.getQuotesForDate(date),author:this.getAuthorForDate(date), currentMonth: date.getMonth() === this.currentdate.getMonth()
      });
    }
  }

   /**
   * Generates the days for the month view 
   */
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
      this.daysinMonth.push({ date:prevDate, quote:this.getQuotesForDate(prevDate),author:this.getAuthorForDate(prevDate),
        currentMonth:false,
      })
    }

    for(let i=1;i<=total_days;i++)
    {
      const currentDate=new Date(year,month,i);
      this.daysinMonth.push({
        date:currentDate, quote:this.getQuotesForDate(currentDate), currentMonth:true,author:this.getAuthorForDate(currentDate),
      })
    }


    const totalcells=Math.ceil(this.daysinMonth.length/7)*7
    const extradays=totalcells-this.daysinMonth.length;

    for(let i=1;i<=extradays;i++)
    {
      const nextDate=new Date(year,month+1,i);
      this.daysinMonth.push({
        date:nextDate,quote:this.getQuotesForDate(nextDate),author:this.getAuthorForDate(nextDate),currentMonth:false

      })
    }


  }
 

    /**
   * Retrieves quotes for a specific date.
   * @param date The date to search for quotes
   * @returns {string[]} An array of quote strings
   */
  getQuotesForDate(date: Date): string[] {
    const isoDate = date.toLocaleDateString('en-CA');
    return this.quotes.filter(
      function (value , index , array){
         
          return value.date===isoDate
      },
    ).map((value,index,array)=>{
      return value.quote
    }) 
    
  } 

  getAuthorForDate(date:Date){
    const datestr=date.toLocaleDateString('en-CA');
    const author_found=this.quotes.find(q=>q.date===datestr)
    return author_found?author_found.author:''
  }
 /** Moves to the next month in month view. */
   nextMonth(){
    this.currentdate = new Date(this.currentdate.getFullYear(), this.currentdate.getMonth() + 1, 1);
    this.generateMonthDays();
  }
/** Moves to the previous month in month view. */
  previousMonth() {
    this.currentdate = new Date(this.currentdate.getFullYear(), this.currentdate.getMonth() - 1, 1);
    this.generateMonthDays();
  }

  /**
   * Gets a label for the current month.
   * @returns string
   */
   getMonthLabel(): string {
    return this.currentdate.toLocaleString('default', { month: 'long', year: 'numeric' });
  }

/** Moves to the next week in week view. */
 nextWeek() {
  this.currentdate = new Date(
    this.currentdate.getFullYear(),
    this.currentdate.getMonth(),
    this.currentdate.getDate() + 7
  );
  this.getWeekDays(this.currentdate);
}


/** Moves to the previous week in week view. */
previousWeek() {
  this.currentdate = new Date(
    this.currentdate.getFullYear(),
    this.currentdate.getMonth(),
    this.currentdate.getDate() - 7
  );
  this.getWeekDays(this.currentdate);
}



 /**
   * Gets a label for the current week.
   * @returns A string like "Aug 4 - Aug 10, 2025"
   */
getWeekLabel(): string {
  const startOfWeek = this.getWeekStart(this.currentdate);
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(endOfWeek.getDate() + 6);

  const startLabel = startOfWeek.toLocaleDateString('default', { month: 'short', day: 'numeric' });
  const endLabel = endOfWeek.toLocaleDateString('default', { month: 'short', day: 'numeric', year: 'numeric' });

  return `${startLabel} - ${endLabel}`;
}



/**
   * Gets the start date of the week for a given date.
   * @param date The date to find the week start for
   * @returns The Monday of the given week
   */
private getWeekStart(date: Date): Date {
  const dayIndex = (date.getDay() + 6) % 7;
  const start = new Date(date);
  start.setDate(start.getDate() - dayIndex);
  return start;
}


}
