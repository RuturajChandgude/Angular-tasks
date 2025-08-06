import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  getUser(){
    return this.http.get("https://mocki.io/v1/18d05d07-5939-48f5-afc5-5fcee05d8ff0")
  }
}
