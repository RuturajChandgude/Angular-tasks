import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogRef,MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Quote, QuoteService } from '../quote.service';
@Component({
  selector: 'app-show-details-dialog',
  standalone: true,
  imports: [CommonModule,MatDialogModule],
  templateUrl: './show-details-dialog.component.html',
  styleUrls: ['./show-details-dialog.component.css']
})
export class ShowDetailsDialogComponent {
constructor(private quoteservice:QuoteService,
  @Inject(MAT_DIALOG_DATA) public data:Quote[],
  public dialogRef:MatDialogRef<ShowDetailsDialogComponent>){}

}
