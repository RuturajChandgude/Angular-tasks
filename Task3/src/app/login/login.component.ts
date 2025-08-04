import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router'
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {Router} from '@angular/router';
import { UserdataService } from '../userdata.service';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,MatInputModule,MatCardModule,MatButtonModule,MatFormFieldModule,MatTableModule,RouterOutlet],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  displayedColumns: string[] = ['username', 'email', 'phoneNumber', 'birthdate', 'pincode', 'district', 'state'];
dataSource: any[] = [];

  constructor(private fb:FormBuilder,private router:Router,private userDataService: UserdataService){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
 ngOnInit() {
    this.dataSource = this.userDataService.getUsers();
    console.log("Loaded users:", this.dataSource);
  }

   
 get f(){
  return this.loginForm.controls
 }
 handleRegisterData(data: any) {
  console.log('Received data:', data);
  this.dataSource = [data]; 
}
 onSubmit(){
 if (this.loginForm.valid) {
      console.log(this.loginForm.value);  
      this.router.navigate(['/purchase'])
    } else {
      this.loginForm.markAllAsTouched();
    }
 }
 
}
