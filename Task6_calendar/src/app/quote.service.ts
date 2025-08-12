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

//  private apiUrl = 'http://localhost:3000/quotes';
private apiUrl='http://localhost:8000/events'

  constructor(private http: HttpClient) {}

  getQuotes(): Observable<Quote[]> {
    return this.http.get<Quote[]>(this.apiUrl)
  }
  //  postQuote(newQuote: Quote): Observable<Quote> {
  //   return this.http.post<Quote>(this.apiUrl,newQuote);
  // }

  
  postQuote(newQuote:Quote):Observable<Quote>{
    return this.http.post<Quote>(this.apiUrl,newQuote)
  }

  getQuoteDetails():Observable<Quote[]>{
    return this.http.get<Quote[]>(this.apiUrl)
  }

  // updateTask(updateQuote:Quote):Observable<Quote>{
  //   return this.http.put<Quote>(`${this.apiUrl}/${updateQuote.id}`,updateQuote)
  // }
  updateTask(updateQuote:Quote):Observable<Quote>{
    return this.http.put<Quote>(`${this.apiUrl}/${updateQuote.id}`,updateQuote)
  }

  deleteTask(quote_id:number):Observable<Quote>{
    return this.http.delete<Quote>(`${this.apiUrl}/${quote_id}`)
  }
}
