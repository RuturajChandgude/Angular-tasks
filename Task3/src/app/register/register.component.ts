import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import { RouterOutlet } from '@angular/router'
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,MatInputModule,MatFormFieldModule,MatButtonModule,MatCardModule,RouterOutlet],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
registerForm:FormGroup
constructor(private fb:FormBuilder,private router:Router){
  this.registerForm=this.fb.group({
    username:['',[Validators.required,Validators.minLength(3)]],
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.minLength(6)]],
    confirmPassword:['',Validators.required]
  },{validator:this.matchPasswords})
}
get f(){
  return this.registerForm.controls
}
matchPasswords(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return password === confirm ? null : { notSame: true };
  }
  onSubmit(){
  if(this.registerForm.controls){

  console.log(this.registerForm.value)
  this.router.navigate(['/login'])
  }else{
    this.registerForm.markAllAsTouched();
  }
}
}


