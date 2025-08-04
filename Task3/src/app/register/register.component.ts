import { Component,Output, EventEmitter} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { RouterOutlet } from '@angular/router'
import { Router } from '@angular/router';
import { PincodeService } from '../pincode.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { UserdataService } from '../userdata.service';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSnackBarModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatCardModule, RouterOutlet],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup
  error = ''
  success = ''
 
  constructor(private fb: FormBuilder, private router: Router, private PincodeService: PincodeService, private snackBar: MatSnackBar,private userDataService:UserdataService) {

    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required ],
      birthDate:['',Validators.required],
      phoneNumber:['',[Validators.required, Validators.pattern("[0-9 ]{10}")]],
      pincode: ['', [Validators.required, Validators.minLength(6),
      Validators.maxLength(6)]],
      district: ['', Validators.required],
      state: ['', Validators.required],
    },{ validators: this.confirmPasswordValidator })
  }
  get f() {
    return this.registerForm.controls
  }

  confirmPasswordValidator: ValidatorFn = (
    group: AbstractControl
  ): ValidationErrors | null => {
    const password = group.get('password')?.value;
  const confirmPassword = group.get('confirmPassword')?.value;
  return password === confirmPassword ? null : { PasswordNoMatch: true };
  };

  onSubmit() {

    const pin = this.registerForm.value.pincode;
    const district = this.registerForm.value.district;
    const state = this.registerForm.value.state;


    this.PincodeService.getPostOffice(pin).subscribe((data) => {
      if (!data) {

        this.snackBar.open('Invalid address details', 'Undo', {
          duration: 3000
        });

        return
      }

      for (let d of data) {
        if (d.District.toLowerCase() === district.toLowerCase() && d.State.toLowerCase() === state.toLowerCase()) {
          if (!this.registerForm.valid) {
            this.snackBar.open('Invalid password', 'Undo', {
              duration: 3000
            })
            return
          }
           this.userDataService.addUser(this.registerForm.value);
          this.router.navigate(['/login'])
        } else {

          this.registerForm.markAllAsTouched();
        }
      }

    })
  }
}


