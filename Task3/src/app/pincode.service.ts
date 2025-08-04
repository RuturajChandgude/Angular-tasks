import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,map } from 'rxjs';
export interface PostOffice{
Name:string,
District:string,
State:string,
Pincode:string
}
export interface apiResponse{
  Message:string,
  Status:string,
  PostOffice:PostOffice[]
}
@Injectable({
  providedIn: 'root'
})
export class PincodeService {

  constructor(private http:HttpClient) { }

  getPostOffice(pincode:string):Observable<PostOffice[] | null>{
    return this.http.get<apiResponse[]>(`https://api.postalpincode.in/pincode/${pincode}`).pipe(
      map((response)=>{
        const data=response[0]
        if(data.Status==='Success' && data.PostOffice.length>0)
        {
          console.log(data.Message)
          return data.PostOffice
        }
        return null;
      })
    )
  }
}
