import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  getUser(){
    return this.http.get("https://mocki.io/v1/f2d2949d-32f3-4af0-a828-509fbef048bb")
  }
}
