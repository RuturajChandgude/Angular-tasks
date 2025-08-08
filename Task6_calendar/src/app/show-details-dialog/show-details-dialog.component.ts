import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogRef,MatDialogModule } from '@angular/material/dialog'
import { QuoteService } from '../quote.service';
@Component({
  selector: 'app-show-details-dialog',
  standalone: true,
  imports: [CommonModule,MatDialogModule],
  templateUrl: './show-details-dialog.component.html',
  styleUrls: ['./show-details-dialog.component.css']
})
export class ShowDetailsDialogComponent {
constructor(private quoteservice:QuoteService,public dialogRef:MatDialogRef<ShowDetailsDialogComponent>){}




}
