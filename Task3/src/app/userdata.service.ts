import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserdataService {
   private registeredUsers: any[] = [];
  constructor() { }

  addUser(user: any) {
    this.registeredUsers.push(user);
  }

  getUsers() {
    return this.registeredUsers;
  }
}
