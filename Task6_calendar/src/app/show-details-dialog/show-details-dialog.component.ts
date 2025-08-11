import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogRef,MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Quote, QuoteService } from '../quote.service';
import { AddEventDialogComponent } from '../add-event-dialog/add-event-dialog.component';
@Component({
  selector: 'app-show-details-dialog',
  standalone: true,
  imports: [CommonModule,MatDialogModule, AddEventDialogComponent],
  templateUrl: './show-details-dialog.component.html',
  styleUrls: ['./show-details-dialog.component.css']
})
export class ShowDetailsDialogComponent {
constructor(private quoteservice:QuoteService,public addevent:AddEventDialogComponent,
  @Inject(MAT_DIALOG_DATA) public data:Quote[],
  public dialogRef:MatDialogRef<ShowDetailsDialogComponent>){}


}
