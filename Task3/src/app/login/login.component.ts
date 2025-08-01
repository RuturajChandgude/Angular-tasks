import { Component } from '@angular/core';
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
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,MatInputModule,MatCardModule,MatButtonModule,MatFormFieldModule,RouterOutlet],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm:FormGroup;

  constructor(private fb:FormBuilder,private router:Router){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
 get f(){
  return this.loginForm.controls
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
