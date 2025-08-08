import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogRef,MatDialogModule } from '@angular/material/dialog'
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
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
constructor(public dialogRef:MatDialogRef<AddEventDialogComponent>){}

submit(){
  if(this.eventDate && this.quote){
    //passing data for another componrnt
    this.dialogRef.close({date:this.eventDate,quote:this.quote})
  }
}

cancel(){
  this.dialogRef.close();
}
}
