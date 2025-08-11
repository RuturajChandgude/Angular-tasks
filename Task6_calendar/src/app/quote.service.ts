import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
export interface Quote {
  id?:number;
  date: string;
  quote: string;
  author:string
}
@Injectable({
  providedIn: 'root'
})

export class QuoteService {

  //private dataUrl = 'assets/data.json';
  private apiUrl = 'http://localhost:3000/quotes';
  constructor(private http: HttpClient) {}

  getQuotes(): Observable<Quote[]> {
    return this.http.get< Quote[]>(this.apiUrl)
  }
   postQuote(newQuote: Quote): Observable<Quote> {
    return this.http.post<Quote>(this.apiUrl,newQuote);
  }

  

  getQuoteDetails():Observable<Quote[]>{
    return this.http.get<Quote[]>(this.apiUrl)
  }

  updateTask(updateQuote:Quote):Observable<Quote>{
    return this.http.put<Quote>(`${this.apiUrl}/${updateQuote.id}`,updateQuote)
  }
}
