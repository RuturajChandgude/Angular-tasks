import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
export interface Quote {
  date: string;
  quote: string;
}
@Injectable({
  providedIn: 'root'
})


export class QuoteService {

  private dataUrl = 'assets/data.json';

  constructor(private http: HttpClient) {}

  getQuotes(): Observable<Quote[]> {
    return this.http.get<{ quotes: Quote[] }>(this.dataUrl).pipe(
      map(data => data.quotes)
    );
  }

}
