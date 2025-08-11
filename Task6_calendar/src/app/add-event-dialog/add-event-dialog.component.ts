import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogRef,MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Quote } from '../quote.service';
//import {provideNativeDateAdapter} from '@angular/material/core';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@Component({
  selector: 'app-add-event-dialog',
  standalone: true,
  imports: [CommonModule,MatNativeDateModule,MatFormFieldModule,MatDialogModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, FormsModule, MatButtonModule],
  templateUrl: './add-event-dialog.component.html',
  styleUrls: ['./add-event-dialog.component.css']
})
export class AddEventDialogComponent {

eventDate:Date | null =null
quote:string=''
author:string=''
mode!: 'add' | 'edit';
isEdit=false
constructor(public dialogRef:MatDialogRef<AddEventDialogComponent>,@Inject(MAT_DIALOG_DATA) public data:any){
  if(data){
    this.mode= data.mode || 'add'
    this.eventDate=data.date || null
    this.quote=data.quote || ''
    this.author=data.author || ''
    this.isEdit=!data.isEdit
  }
}

/**
 * Submits the event data to the dialog reference.
 */
submit(){
  if(this.eventDate && this.quote){
    //passing data for another componrnt
    this.dialogRef.close({date:this.eventDate,quote:this.quote,author:this.author})
  }
}





/**
 * Cancels the event creation and closes the dialog.
 */
cancel(){
  this.dialogRef.close();
}
}
